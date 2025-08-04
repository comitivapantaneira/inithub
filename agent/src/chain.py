from src.nodes import (
    classify_flow,
    node_extract_initiative,
    router_flow,
    node_guide,
    node_find_initiative,
    node_register_initiative,
)
from src.schemas import State

from langgraph.graph import StateGraph, START, END


workflow = StateGraph(State)

workflow.add_node("classify_flow", classify_flow)
workflow.add_node("router_flow", router_flow)
workflow.add_node("guide", node_guide)
workflow.add_node("find_initiative", node_find_initiative)
workflow.add_node("register_initiative", node_register_initiative)
workflow.add_node("extract_initiative", node_extract_initiative)

workflow.add_edge(START, "classify_flow")
workflow.add_edge("classify_flow", "router_flow")
workflow.add_conditional_edges(
    "router_flow",
    lambda state: state.get("next"),
    {
        "guide": "guide",
        "find_initiative": "find_initiative",
        "register_initiative": "register_initiative",
    },
)
workflow.add_edge("guide", END)
workflow.add_edge("find_initiative", END)
workflow.add_edge("register_initiative", "extract_initiative")
workflow.add_edge("extract_initiative", END)

chain = workflow.compile()

chain.get_graph().draw_png("Fluxo do Agente.png")
