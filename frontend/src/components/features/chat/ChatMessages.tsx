import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from 'lucide-react';
import { getAvatarClasses, getAvatarEmoji, getMessageClasses } from "@/utils/functions/functionsChat";
import { Input } from "@/ui/input";
import type { Message } from "@/types/index";
import { agentService, type ChatInitiative } from "@/services/agent";

const initialIaGreeting: Message = {
    id: "seed-ia-1",
    author: "ia",
    text: "Olá! 👋 Vou te ajudar a estruturar sua ideia. Me conte sobre sua proposta."
};

type Props = {
    onInitiativeUpdate?: (initiative: ChatInitiative | null) => void;
};

const ChatMessages = ({ onInitiativeUpdate }: Props) => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([initialIaGreeting]);

    const navigate = useNavigate();

    const goToPreviousScreen = () => {
        navigate(-1);
    };

    useEffect(() => {
        agentService.connect();
        const unsub = agentService.subscribe(({ message, initiative }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: String(Date.now()),
                    author: "ia",
                    text: message,
                },
            ]);
            onInitiativeUpdate?.(initiative);
        });
        return () => {
            unsub();
        };
    }, [onInitiativeUpdate]);

    // Auto-scroll to bottom on new messages
    const messagesRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = messagesRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        const text = inputMessage.trim();
        if (!text) return;
        // Push user message locally
        setMessages((prev) => [
            ...prev,
            { id: String(Date.now()), author: "user", text },
        ]);
        // Send to agent
        agentService.sendMessage(text);
        setInputMessage('');
    };
  
    return (
        <div className="flex flex-col h-[80vh] bg-white rounded-lg overflow-hidden">
            <div className="bg-[var(--green-primary)] text-white p-4 rounded-t-lg">
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
        
            <div ref={messagesRef} className="flex-1 p-4 overflow-y-auto space-y-4">
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
            </div>
            
            <div className="p-4 border-t">
                <div className="flex gap-2">
                    <Input
                        id="message-input"
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
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
}
;

export default ChatMessages;
