from src.nodes import (
    classify_flow,
    router,
    node_guide,
    node_find_initiative,
    node_register_initiative,
)
from src.schemas import State

from langgraph.graph import StateGraph, START, END


workflow = StateGraph(State)

workflow.add_node("classifier", classify_flow)
workflow.add_node("router", router)
workflow.add_node("guide", node_guide)
workflow.add_node("find_initiative", node_find_initiative)
workflow.add_node("register_initiative", node_register_initiative)

workflow.add_edge(START, "classifier")
workflow.add_edge("classifier", "router")
workflow.add_conditional_edges(
    "router",
    lambda state: state.get("next"),
    {
        "guide": "guide",
        "find_initiative": "find_initiative",
        "register_initiative": "register_initiative",
    },
)
workflow.add_edge("guide", END)
workflow.add_edge("find_initiative", END)
workflow.add_edge("register_initiative", END)

chain = workflow.compile()

chain.get_graph().draw_png("Fluxo do Agente.png")
