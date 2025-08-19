import os

from dotenv import load_dotenv

load_dotenv()


LOGGING_LEVEL = os.getenv("LOGGING_LEVEL", "info")

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")

OPENROUTER_MODEL_NAME = os.getenv("OPENROUTER_MODEL_NAME", "openai/gpt-4.1-nano")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_ENDPOINT = os.getenv("OPENROUTER_ENDPOINT", "https://openrouter.ai/api/v1")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL_NAME = os.getenv("OPENAI_MODEL_NAME", "gpt-4.1-2025-04-14")

AGENT_MODEL_TEMPERATURE = float(os.getenv("AGENT_MODEL_TEMPERATURE", "0.3"))

COLORLOG_AVAILABLE = os.getenv("COLORLOG_AVAILABLE", "true").lower() in (
    "true",
    "1",
    "yes",
)
