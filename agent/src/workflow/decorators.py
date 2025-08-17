from src.schemas.agent import State

from functools import wraps
import logging
from logging import getLogger


PROMPTS_DIR = "prompts"


def log_node(func):
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


def with_prompt(name: str | None = None, add_comportamentals: bool = False):
    def decorator(func):
        @wraps(func)
        def wrapper(state: State, *args, **kwargs):
            prompt_template = ""
            try:
                with open(
                    f"{PROMPTS_DIR}/{name if name else func.__name__}.md",
                    "r",
                    encoding="utf-8",
                ) as f:
                    prompt_template = f.read()
            except FileNotFoundError:
                logging.error(
                    f"Prompt template '{name}' não encontrado em {PROMPTS_DIR}."
                )
            if add_comportamentals:
                try:
                    with open(
                        f"{PROMPTS_DIR}/comportamentals.md", "r", encoding="utf-8"
                    ) as f:
                        prompt_template += f.read()
                except FileNotFoundError:
                    logging.error(
                        f"Arquivo 'comportamentals.md' não encontrado em {PROMPTS_DIR}."
                    )
            kwargs["prompt_template"] = prompt_template
            logging.debug(f"Template carregado: {name} (len={len(prompt_template)})")
            return func(state, *args, **kwargs)

        return wrapper

    return decorator
