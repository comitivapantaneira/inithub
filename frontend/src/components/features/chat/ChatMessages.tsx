import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from 'lucide-react';
import { getAvatarClasses, getAvatarEmoji, getMessageClasses } from "@/utils/functions/functionsChat";
import { Input } from "@/ui/input";
import type { Message } from "@/types/index";
import { WebSocketAgentService, type AgentMessage, type WSStatus } from "@/services/WebSocketAgentService";
import { useInitiative } from "@/contexts/InitiativeContext";

const initialBotMessage: Message = {
    id: `${Date.now()}`,
    author: "ia",
    text: "Olá! 👋 Estou aqui para te ajudar a estruturar sua ideia. Conte um pouco sobre o que você tem em mente."
};

const ChatMessages = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
    const [status, setStatus] = useState<WSStatus>("idle");
    const serviceRef = useRef<WebSocketAgentService | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { updateInitiative } = useInitiative();

    const navigate = useNavigate();

    const goToPreviousScreen = () => {
        navigate(-1);
    };

    useEffect(() => {
        const service = new WebSocketAgentService();
        serviceRef.current = service;

        service.onStatus((s) => setStatus(s));
        service.onMessage((data: AgentMessage) => {
            setMessages((prev) => (
                [...prev, { id: `${Date.now()}-${prev.length}`, author: "ia", text: data.message }]
            ));
            
            // Update initiative data if present
            if (data.initiative) {
                updateInitiative(data.initiative);
            }
        });

        service.connect();

        return () => {
            service.close();
            serviceRef.current = null;
        };
    }, [updateInitiative]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const text = inputMessage.trim();
        if (!text) return;

        // Optimistic append
        setMessages((prev) => ([...prev, { id: `${Date.now()}-${prev.length}`, author: "user", text }]));
        setInputMessage("");

        try {
            serviceRef.current?.sendMessage(text);
        } catch (e) {
            console.error(e);
            // If failed, reflect error in UI
            setMessages((prev) => ([...prev, { id: `${Date.now()}-${prev.length}`, author: "ia", text: "[Erro] Conexão indisponível. Tente novamente." }]));
        }
    };

    return (
        <div className="h-[86vh] flex flex-col bg-white rounded-lg overflow-hidden">
            <div className="bg-[var(--green-primary)] text-white p-3 rounded-t-lg flex-shrink-0">
                <div className="flex items-center gap-3 mb-2">
                    <button
                        onClick={goToPreviousScreen}
                        className="p-2 rounded-full transition-colors hover:bg-green-700"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button> 
                    <h2 className="font-semibold text-lg">Assistente de Criação</h2>
                </div>
            </div>
        
            <div className="flex-1 p-3 overflow-y-auto space-y-3 min-h-0">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.author === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className="flex items-start gap-3 max-w-xs">
                            {message.author !== "user" && (
                                <div className={getAvatarClasses(message.author)}>
                                    {getAvatarEmoji(message.author)}
                                </div>
                            )}

                            <div className={`p-3 rounded-lg ${getMessageClasses(message.author)}`}>
                                <p className="text-sm">{message.text}</p>
                            </div>

                            {message.author === "user" && (
                                <div className={getAvatarClasses(message.author)}>
                                    {getAvatarEmoji(message.author)}
                                </div>
                            )}
                    </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t flex-shrink-0">
                <div className="flex gap-2">
                    <Input
                        id="message-input"
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                        placeholder="Digite sua mensagem..."
                        style={{ borderRadius: '25px' }}
                    />
                    <button
                        className="bg-[var(--green-primary)] text-white p-3 rounded-3xl hover:bg-green-700 transition-colors focus:outline-none"
                        onClick={handleSend}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatMessages;

