import os

from dotenv import load_dotenv

load_dotenv()


LOGGING_LEVEL = os.getenv("LOGGING_LEVEL", "info")

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql+asyncpg://inithub:inithub@localhost:5432/comitiva_db"
)
