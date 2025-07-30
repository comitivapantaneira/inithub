from src.config import env

from langchain_openai import ChatOpenAI

import logging

default_llm = ChatOpenAI(
    model=env.OPENROUTER_MODEL_NAME,
    temperature=0.3,
    base_url=env.OPENROUTER_ENDPOINT,
    api_key=env.OPENROUTER_API_KEY,
)

logging.info(f"Using as default llm: {default_llm.model_name}")
