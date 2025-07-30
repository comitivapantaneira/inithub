from src.initiatives.routes import router
from src.db import init_db
from src.config.logger import setup_logging

from fastapi import FastAPI

app = FastAPI(
    title="Gestão de Iniciativas",
    description="API para gestão colaborativa de iniciativas internas em empresas.",
    version="1.0.0",
)

app.include_router(router)


@app.on_event("startup")
async def startup_event():
    setup_logging()
    await init_db()


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}
