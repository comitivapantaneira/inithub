from src.schemas import State, FlowClassifier, Initiative
from src.llms import default_llm

from langchain_core.messages import AIMessage

import logging


PROMPTS_DIR = "prompts"


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
        return {"flow_type": result.flow_type}
    except Exception as e:
        logging.error(
            f"Failed to classify flow: {e}\n\nUsing default 'guide' flow type."
        )
        return {"flow_type": "guide"}


def router_flow(state: State):
    flow_type = state.get("flow_type", "direcionar")

    if flow_type == "registrar":
        return {"next": "register_initiative"}
    elif flow_type == "consultar":
        return {"next": "find_initiative"}

    return {"next": "guide"}


def node_guide(state: State):
    with open(f"{PROMPTS_DIR}/guide.md", "r", encoding="utf-8") as f:
        prompt_content = f.read()

    return {
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


def node_register_initiative(state: State):
    with open(f"{PROMPTS_DIR}/register_initiative.md", "r", encoding="utf-8") as f:
        prompt_template = f.read()

    new_initiative = state.get("initiative") or {}

    prompt_content = prompt_template.format(
        title=getattr(new_initiative, "title", "N/A"),
        theme=getattr(new_initiative, "theme", "N/A"),
        description=getattr(new_initiative, "description", "N/A"),
    )

    return {
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


def node_extract_initiative(state: State):
    last_msg = state["messages"][-1]
    classifier_llm = default_llm.with_structured_output(Initiative)
    new_initiative = state.get("initiative")

    if new_initiative is None:
        new_initiative = Initiative(
            title=None, responsible=None, theme=None, description=None
        )

    elif isinstance(new_initiative, dict):
        new_initiative = Initiative(**new_initiative)

    try:
        with open(f"{PROMPTS_DIR}/extract_initiative.md", "r", encoding="utf-8") as f:
            prompt_template = f.read()

        prompt_content = prompt_template.format(
            title=new_initiative.title,
            theme=new_initiative.theme,
            description=new_initiative.description,
        )

        result = classifier_llm.invoke(
            [
                {
                    "role": "system",
                    "content": prompt_content,
                },
                {"role": "user", "content": last_msg.content},
            ]
        )

        # Merge with previous initiative, preferring new values if present
        updated_initiative = Initiative(
            title=getattr(result, "title", None) or new_initiative.title,
            theme=getattr(result, "theme", None) or new_initiative.theme,
            description=getattr(result, "description", None)
            or new_initiative.description,
        )
        print(f"Updated Initiative: {updated_initiative.dict()}")
        return {"initiative": updated_initiative}
    except Exception as e:
        logging.error(f"Failed to classify initiative: {e}")
        return {"initiative": new_initiative}


def node_find_initiative(state: State):
    return {
        "messages": [
            AIMessage(
                role="assistant",
                content="Ótimo! Vou buscar no banco de iniciativas se ela já existe. Pode me dizer o nome ou uma breve descrição?",
            )
        ]
    }
