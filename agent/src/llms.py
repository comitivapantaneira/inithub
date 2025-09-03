from src.config import env

from langchain_openai import ChatOpenAI

import logging

if env.OPENAI_API_KEY:
    default_llm = ChatOpenAI(
        model=env.OPENAI_MODEL_NAME,
        temperature=env.AGENT_MODEL_TEMPERATURE,
        api_key=env.OPENAI_API_KEY,
    )
    logging.info(f"(OpenAI) Using as default llm: {default_llm.model_name}")

elif env.OPENROUTER_API_KEY:
    default_llm = ChatOpenAI(
        base_url=env.OPENROUTER_ENDPOINT,
        model=env.OPENROUTER_MODEL_NAME,
        temperature=0.3,
        api_key=env.OPENROUTER_API_KEY,
    )
    logging.info(f"(OpenRouter) Using as default llm: {default_llm.model_name}")

else:
    raise ValueError("No valid API key found for OpenRouter or OpenAI.")
