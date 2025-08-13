from src import nodes
from src.schemas import State

from langgraph.graph import StateGraph, START, END


workflow = StateGraph(State)

workflow.add_node("classify_user_request", nodes.classify_user_request)
workflow.add_node("route_user_request", nodes.route_user_request)
workflow.add_node("guide", nodes.guide)
workflow.add_node("find_initiative", nodes.find_initiative)
workflow.add_node("register_initiative", nodes.register_initiative)
workflow.add_node("extract_initiative", nodes.extract_initiative)
workflow.add_node("save_initiative", nodes.save_initiative)
workflow.add_node("is_initiative_complete", nodes.is_initiative_complete)

workflow.add_edge(START, "classify_user_request")
workflow.add_edge("classify_user_request", "route_user_request")
workflow.add_conditional_edges(
    "route_user_request",
    lambda state: state.get("next"),
    {
        "guide": "guide",
        "find_initiative": "find_initiative",
        "register_initiative": "is_initiative_complete",
    },
)
workflow.add_conditional_edges(
    "is_initiative_complete",
    lambda state: state.get("next"),
    {
        "register_initiative": "register_initiative",
        "save_initiative": "save_initiative",
    },
)
workflow.add_edge("guide", END)
workflow.add_edge("find_initiative", END)
workflow.add_edge("register_initiative", "extract_initiative")
workflow.add_edge("extract_initiative", END)
workflow.add_edge("save_initiative", END)

chain = workflow.compile()

chain.get_graph().draw_png("Fluxo do Agente.png")
