// Lightweight service to manage a WebSocket connection to the Agent
// Endpoint defaults to Vite env VITE_AGENT_WS_URL, falling back to localhost.

export interface Initiative {
  title: string | null;
  context: string | null;
  theme: string | null;
  deliverable: string | null;
  avaliation_criteria: string | null;
}

export type AgentMessage = { 
  message: string;
  initiative?: Initiative | null;
};

export type WSStatus = "idle" | "connecting" | "open" | "closed" | "error";

export class WebSocketAgentService {
  private socket: WebSocket | null = null;
  private url: string;
  private onMessageCb?: (data: AgentMessage) => void;
  private onStatusCb?: (status: WSStatus) => void;

  constructor(url?: string) {
    const envUrl = (import.meta as any)?.env?.VITE_AGENT_WS_URL as string | undefined;
    const fallback = `ws://${window.location.hostname}:8000/ws/v1/agent`;
    this.url = url || envUrl || fallback;
  }

  onMessage(cb: (data: AgentMessage) => void) {
    this.onMessageCb = cb;
  }

  onStatus(cb: (status: WSStatus) => void) {
    this.onStatusCb = cb;
  }

  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.notifyStatus("connecting");

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => this.notifyStatus("open");

    this.socket.onclose = () => this.notifyStatus("closed");

    this.socket.onerror = () => this.notifyStatus("error");

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data: AgentMessage = JSON.parse(event.data);
        this.onMessageCb?.(data);
      } catch (e) {
        console.error("Invalid WS payload", e);
      }
    };
  }

  sendMessage(text: string) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not open");
    }
    const payload = JSON.stringify({ message: text });
    this.socket.send(payload);
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  private notifyStatus(status: WSStatus) {
    this.onStatusCb?.(status);
  }
}
