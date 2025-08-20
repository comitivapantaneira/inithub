from src.workflow.chain import chain
from src.config import logger

import logging


def run_agent():
    state = {"messages": [], "flow_type": None}

    while True:
        user_input = input("User: ")

        if user_input.lower() in ["quit", "exit", "q"]:
            logging.info("Até logo!")
            break

        state["messages"] = state.get("messages", []) + [
            {"role": "user", "content": user_input}
        ]

        state = chain.invoke(state)

        if state.get("messages") and len(state["messages"]) > 0:
            last_msg = state["messages"][-1]
            logging.info(f"Assistant: {last_msg.content}")


if __name__ == "__main__":
    logger.setup_logging()
    run_agent()
