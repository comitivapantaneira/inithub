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
        def short_state(s):
            short = dict(s)
            if "messages" in short and isinstance(short["messages"], list):
                msgs = (
                    short["messages"][-2:]
                    if len(short["messages"]) > 2
                    else short["messages"]
                )

                # Only show role and content for each message
                def msg_repr(m):
                    if hasattr(m, "role") and hasattr(m, "content"):
                        return {
                            "role": getattr(m, "role", None),
                            "content": getattr(m, "content", None),
                        }
                    if isinstance(m, dict):
                        return {"role": m.get("role"), "content": m.get("content")}
                    return str(m)

                short["messages"] = [msg_repr(m) for m in msgs]
            short["initiative"] = getattr(
                s.get("initiative"), "__dict__", s.get("initiative")
            )
            short["flow_type"] = getattr(
                s.get("flow_type"), "__dict__", s.get("flow_type")
            )

            return short

        log.debug(f"[{func.__name__}] State before: {short_state(state)}")
        result = func(state, *args, **kwargs)
        log.debug(
            f"[{func.__name__}] State after: {short_state(result) if isinstance(result, dict) else result}"
        )
        return result

    return wrapper


@log_node
def classify_user_request(state: State):
    last_msg = state["messages"][-1]
    classifier_llm = default_llm.with_structured_output(FlowClassifier)
    flow_type = state.get("flow_type", None)

    # If the user is already in a flow, keep it
    if flow_type in ["consultar", "registrar"]:
        return {"flow_type": flow_type}

    try:
        with open(
            f"{PROMPTS_DIR}/classify_user_request.md", "r", encoding="utf-8"
        ) as f:
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
def route_user_request(state: State):
    flow_type = state.get("flow_type", "direcionar")

    if flow_type == "registrar":
        return {"next": "register_initiative"}
    elif flow_type == "consultar":
        return {"next": "find_initiative"}

    return {"next": "guide"}


@log_node
def guide(state: State):
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
def register_initiative(state: State):
    new_initiative = state.get("initiative") or {}

    with open(f"{PROMPTS_DIR}/register_initiative.md", "r", encoding="utf-8") as f:
        prompt_template = f.read()

    prompt_content = prompt_template.format(
        CONTEXT=getattr(new_initiative, "context", "N/A"),
        DELIVERABLE=getattr(new_initiative, "deliverable", "N/A"),
        AVALIATION_CRITERIA=getattr(new_initiative, "avaliation_criteria", "N/A"),
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
def is_initiative_complete(state: State):
    new_initiative = state.get("initiative") or {}

    if new_initiative and all(
        [
            new_initiative.title,
            new_initiative.context,
            new_initiative.theme,
            new_initiative.deliverable,
            new_initiative.avaliation_criteria,
        ]
    ):
        return {"next": "save_initiative"}
    else:
        return {"next": "register_initiative"}


@log_node
def extract_initiative(state: State):
    new_initiative = state.get("initiative") or Initiative(
        title=None, theme=None, context=None, deliverable=None, avaliation_criteria=None
    )
    classifier_llm = default_llm.with_structured_output(Initiative)

    try:
        with open(f"{PROMPTS_DIR}/extract_initiative.md", "r", encoding="utf-8") as f:
            prompt_template = f.read()

        prompt_content = prompt_template.format(
            TITLE=new_initiative.title,
            CONTEXT=new_initiative.context,
            THEME=new_initiative.theme,
            DELIVERABLE=new_initiative.deliverable,
            AVALIATION_CRITERIA=new_initiative.avaliation_criteria,
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
            title=getattr(result, "title") or new_initiative.title,
            context=getattr(result, "context") or new_initiative.context,
            theme=getattr(result, "theme") or new_initiative.theme,
            deliverable=getattr(result, "deliverable") or new_initiative.deliverable,
            avaliation_criteria=getattr(result, "avaliation_criteria")
            or new_initiative.avaliation_criteria,
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
def save_initiative(state: State):
    msgs = [
        "Ótimo, aguarde um momento, estou registrando sua iniciativa!",
        "Iniciativa registrada com sucesso! Você pode revisar e complementar as informações em www.inithub.com/initiatives/12345.",
    ]

    result = {
        "messages": state["messages"]
        + [AIMessage(role="assistant", content=msg) for msg in msgs]
    }
    return result


@log_node
def find_initiative(state: State):
    result = {
        "messages": [
            AIMessage(
                role="assistant",
                content="Ótimo! Vou buscar no banco de iniciativas se ela já existe. Pode me dizer o nome ou uma breve descrição?",
            )
        ]
    }
    return result
