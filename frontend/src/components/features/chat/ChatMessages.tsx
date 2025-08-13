import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from 'lucide-react';
import { getAvatarClasses, getAvatarEmoji, getMessageClasses } from "@/utils/functions/functionsChat";
import { Input } from "@/ui/input";
import type { Message } from "@/types/index";

const messages: Message[] = [
    {
        id: "1",
        author: "ia",
        text: "Olá, John Doe! 👋 Estou aqui para te ajudar a criar uma nova ideia para a empresa. Vamos começar? Me conte sobre sua proposta..."
    },
    {
        id: "2",
        author: "user",
        text: "Olá! Tenho uma ideia sobre melhorar nosso processo de onboarding de novos funcionários. Acho que isso pode aumentar a produtividade e engajamento desde o início. Você pode me ajudar a estruturar isso?"
    },
    {
        id: "3",
        author: "ia",
        text: "Interessante! Problemas no onboarding realmente afetam a produtividade e o engajamento dos novos funcionários. Vamos começar definindo os principais pontos que você gostaria de abordar. Quais são os maiores desafios que você vê atualmente nesse processo?"
    },
    {
        id: "4",
        author: "ia",
        text: "Olá, John Doe! 👋 Estou aqui para te ajudar a criar uma nova ideia para a empresa. Vamos começar? Me conte sobre sua proposta..."
    },
    {
        id: "5",
        author: "user",
        text: "Olá! Tenho uma ideia sobre melhorar nosso processo de onboarding de novos funcionários. Acho que isso pode aumentar a produtividade e engajamento desde o início. Você pode me ajudar a estruturar isso?"
    },
    {
        id: "6",
        author: "ia",
        text: "Interessante! Problemas no onboarding realmente afetam a produtividade e o engajamento dos novos funcionários. Vamos começar definindo os principais pontos que você gostaria de abordar. Quais são os maiores desafios que você vê atualmente nesse processo?"
    },

];

const ChatMessages = () => {
    const [inputMessage, setInputMessage] = useState('');

    const navigate = useNavigate();

    const goToPreviousScreen = () => {
        navigate(-1);
    };
  
    return (
        <div className="flex flex-col h-full bg-white rounded-lg">
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
                <p className="text-sm font-medium">
                    Vou te ajudar a estruturar sua ideia de forma clara e completa.
                    Fale naturalmente sobre sua proposta!
                </p>
            </div>
        
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
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
                        placeholder="Digite sua mensagem..."
                        style={{ borderRadius: '25px' }}
                    />
                    <button
                        className="bg-[var(--green-primary)] text-white p-3 rounded-3xl hover:bg-green-700 transition-colors focus:outline-none"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatMessages;
