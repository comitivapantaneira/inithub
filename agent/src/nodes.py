from src.schemas import State, FlowClassifier, Initiative
from src.llms import default_llm

from langchain_core.messages import AIMessage

from functools import wraps
import logging
import traceback


PROMPTS_DIR = "prompts"


def log_node(func):
    from logging import getLogger

    log = getLogger("log_node")

    @wraps(func)
    def wrapper(state: State, *args, **kwargs):
        log.debug(f"[{func.__name__}] State before: {state}")
        result = func(state, *args, **kwargs)
        log.debug(f"[{func.__name__}] State after: {result}")
        return result

    return wrapper


@log_node
def classify_flow(state: State):
    last_msg = state["messages"][-1]
    classifier_llm = default_llm.with_structured_output(FlowClassifier)
    flow_type = state.get("flow_type", None)

    # If the user is already in a flow, keep it
    if flow_type in ["consultar", "registrar"]:
        return {"flow_type": flow_type}

    try:
        with open(f"{PROMPTS_DIR}/classify_flow.md", "r", encoding="utf-8") as f:
            prompt_content = f.read()

        result = classifier_llm.invoke(
            [
                {
                    "role": "system",
                    "content": prompt_content,
                },
                {"role": "user", "content": last_msg.content},
            ]
        )

        output = {"flow_type": result.flow_type}
        return output
    except Exception as e:
        logging.error(
            f"Failed to classify flow: {e}\n\nUsing default 'guide' flow type."
        )
        output = {"flow_type": "guide"}
        return output


@log_node
def router_flow(state: State):
    flow_type = state.get("flow_type", "direcionar")

    if flow_type == "registrar":
        return {"next": "register_initiative"}
    elif flow_type == "consultar":
        return {"next": "find_initiative"}

    return {"next": "guide"}


@log_node
def node_guide(state: State):
    with open(f"{PROMPTS_DIR}/guide.md", "r", encoding="utf-8") as f:
        prompt_content = f.read()

    result = {
        "messages": default_llm.invoke(
            state["messages"]
            + [
                {
                    "role": "system",
                    "content": prompt_content,
                }
            ],
        )
    }
    return result


@log_node
def node_register_initiative(state: State):
    with open(f"{PROMPTS_DIR}/register_initiative.md", "r", encoding="utf-8") as f:
        prompt_template = f.read()

    new_initiative = state.get("initiative") or {}

    prompt_content = prompt_template.format(
        CONTEXT=getattr(new_initiative, "context", "N/A"),
        THEME=getattr(new_initiative, "theme", "N/A"),
        DELIVERABLE=getattr(new_initiative, "deliverable", "N/A"),
        AVALIATION_CRITERIA=getattr(new_initiative, "availation_criteria", "N/A"),
    )

    result = {
        "messages": default_llm.invoke(
            state["messages"]
            + [
                {
                    "role": "system",
                    "content": prompt_content,
                }
            ],
        )
    }
    return result


@log_node
def node_extract_initiative(state: State):
    new_initiative = state.get("initiative") or Initiative(
        title=None, theme=None, context=None, deliverable=None, availation_criteria=None
    )
    classifier_llm = default_llm.with_structured_output(Initiative)

    try:
        with open(f"{PROMPTS_DIR}/extract_initiative.md", "r", encoding="utf-8") as f:
            prompt_template = f.read()

        prompt_content = prompt_template.format(
            CONTEXT=new_initiative.context,
            THEME=new_initiative.theme,
            DELIVERABLE=new_initiative.deliverable,
            AVALIATION_CRITERIA=new_initiative.availation_criteria,
        )

        result = classifier_llm.invoke(
            state["messages"]
            + [
                {
                    "role": "system",
                    "content": prompt_content,
                },
            ]
        )

        logging.debug(f"Extracted initiative: {result}")

        # Merge with previous initiative, preferring new values if present
        updated_initiative = Initiative(
            title=new_initiative.title,
            context=getattr(result, "context") or new_initiative.context,
            theme=getattr(result, "theme") or new_initiative.theme,
            deliverable=getattr(result, "deliverable") or new_initiative.deliverable,
            availation_criteria=getattr(result, "availation_criteria")
            or new_initiative.availation_criteria,
        )

        output = {"initiative": updated_initiative}
        return output
    except Exception as e:
        tb = traceback.format_exc()
        logging.error(
            f"Failed to classify initiative: {e}\nTraceback:\n{tb}\nState: {state}\nPrompt: {prompt_content if 'prompt_content' in locals() else 'N/A'}"
        )
        output = {"initiative": new_initiative}
        return output


@log_node
def node_find_initiative(state: State):
    result = {
        "messages": [
            AIMessage(
                role="assistant",
                content="Ótimo! Vou buscar no banco de iniciativas se ela já existe. Pode me dizer o nome ou uma breve descrição?",
            )
        ]
    }
    return result
