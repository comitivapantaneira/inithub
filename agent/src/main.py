from src.chain import chain
from src.config import logger
from src.schemas import State, Initiative

from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles

import json

app = FastAPI()

logger.setup_logging()


@app.websocket("/ws/v1/agent")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    state: State = {"messages": [], "flow_type": None}

    while True:
        try:
            data = await websocket.receive_text()
            payload = json.loads(data)
            user_msg = payload.get("message", "")
        except Exception as e:
            print(f"❌ WebSocket error: {e}")
            break

        state["messages"].append({"role": "user", "content": user_msg})

        state = chain.invoke(state)

        if state.get("messages"):
            last_msg = state["messages"][-1]
            initiative = state.get("initiative")
            response_data = {
                "message": last_msg.content,
                "initiative": initiative.dict() if initiative else None,
            }

            try:
                await websocket.send_text(json.dumps(response_data))
                print("   ✅ Message sent successfully")
            except Exception as e:
                print(f"   ❌ Failed to send message: {e}")
                break


app.mount("/", StaticFiles(directory="ui", html=True), name="ui")
