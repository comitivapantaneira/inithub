import os

from dotenv import load_dotenv

load_dotenv()


LOGGING_LEVEL = os.getenv("LOGGING_LEVEL", "info")

OPENROUTER_MODEL_NAME = os.getenv("OPENROUTER_MODEL_NAME", "openai/gpt-4.1-nano")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_ENDPOINT = os.getenv("OPENROUTER_ENDPOINT", "https://openrouter.ai/api/v1")

COLORLOG_AVAILABLE = os.getenv("COLORLOG_AVAILABLE", "true").lower() in (
    "true",
    "1",
    "yes",
)
