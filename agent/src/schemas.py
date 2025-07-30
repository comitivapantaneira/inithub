from langgraph.graph.message import add_messages
from pydantic import BaseModel, Field
from typing import Literal, TypedDict, Annotated


class FlowClassifier(BaseModel):
    flow_type: Literal["direcionar", "consultar", "registrar"] = Field(
        ...,
        description="Fluxo de conversa que o usuário deseja seguir, buscando direcionamento, consultando uma iniciativa existente ou registrando uma nova.",
    )


class State(TypedDict):
    messages: Annotated[list, add_messages]
    flow_type: str | None
