from src.schemas import State, FlowClassifier
from src.llms import default_llm

from langchain_core.messages import AIMessage

import logging


def classify_flow(state: State):
    last_msg = state["messages"][-1]
    classifier_llm = default_llm.with_structured_output(FlowClassifier)

    try:
        result = classifier_llm.invoke(
            [
                {
                    "role": "system",
                    "content": (
                        """
                        Você é um classificador.
                        Sua tarefa é analisar a mensagem do usuário e o tipo seguindo o formato exigido pelo schema, não retorne nada além do JSON.
                        Os tipos possíveis são:
                        - 'direcionar': usuário está buscando direcionamento ou ajuda.
                        - 'consultar': usuário quer consultar uma iniciativa existente.
                        - 'registrar': usuário quer registrar uma nova iniciativa.
                        """
                    ),
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


def router(state: State):
    flow_type = state.get("flow_type", "direcionar")

    if flow_type == "registrar":
        return {"next": "register_initiative"}
    elif flow_type == "consultar":
        return {"next": "find_initiative"}

    return {"next": "guide"}


def node_guide(state: State):
    return {
        "messages": [
            AIMessage(
                role="assistant",
                content="Olá! Como posso ajudar você hoje? Você gostaria de consultar ou registrar uma iniciativa?",
            )
        ]
    }


def node_register_initiative(state: State):
    return {
        "messages": [
            AIMessage(
                role="assistant",
                content="Vamos registrar uma nova iniciativa. Por favor, forneça os detalhes.",
            )
        ]
    }


def node_find_initiative(state: State):
    return {
        "messages": [
            AIMessage(
                role="assistant",
                content="Ótimo! Vou buscar no banco de iniciativas se ela já existe. Pode me dizer o nome ou uma breve descrição?",
            )
        ]
    }
