import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { useInitiative } from "@/contexts/InitiativeContext";
import { useState, useEffect } from "react";

const ChatInitiativePreview = () => {
    const { initiative } = useInitiative();
    
    // Local state for editable values
    const [editableInitiative, setEditableInitiative] = useState({
        title: "",
        theme: "",
        deliverable: "",
        avaliation_criteria: "",
        context: ""
    });

    // Update local state when initiative from context changes
    useEffect(() => {
        if (initiative) {
            setEditableInitiative({
                title: initiative.title || "",
                theme: initiative.theme || "",
                deliverable: initiative.deliverable || "",
                avaliation_criteria: initiative.avaliation_criteria || "",
                context: initiative.context || ""
            });
        }
    }, [initiative]);

    const handleFieldChange = (field: string, value: string) => {
        setEditableInitiative(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="bg-white rounded-lg flex flex-col overflow-hidden">
            <div className="p-3 border-b flex-shrink-0">
                <h2 className="font-semibold text-lg text-gray-800">Preview da Ideia</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">
                    Estrutura que será criada baseada na conversa.
                </p>
                <p className="text-sm font-medium text-gray-500 mt-1">
                    Edite se necessário e publique!
                </p>
            </div>
  
            <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                <div>
                    <Label htmlFor="initiative-title">Título</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-title" 
                        type="text" 
                        value={editableInitiative.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        placeholder="Aguardando informações da conversa..." 
                    />
                </div>
    
                <div>
                    <Label htmlFor="initiative-theme">Tema</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-theme" 
                        type="text" 
                        value={editableInitiative.theme}
                        onChange={(e) => handleFieldChange('theme', e.target.value)}
                        placeholder="Aguardando informações da conversa..." 
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-deliverable">Entregável</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-deliverable" 
                        type="text" 
                        value={editableInitiative.deliverable}
                        onChange={(e) => handleFieldChange('deliverable', e.target.value)}
                        placeholder="Aguardando informações da conversa..." 
                    />
                </div>
    
                <div>
                    <Label htmlFor="initiative-criteria">Critérios de Avaliação</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-criteria" 
                        type="text" 
                        value={editableInitiative.avaliation_criteria}
                        onChange={(e) => handleFieldChange('avaliation_criteria', e.target.value)}
                        placeholder="Aguardando informações da conversa..." 
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-context">Contexto</Label>
                    <textarea
                        className="w-full p-2 bg-gray-100 border border-gray-200 rounded-lg resize-none"
                        id="initiative-context"
                        rows={3}
                        value={editableInitiative.context}
                        onChange={(e) => handleFieldChange('context', e.target.value)}
                        placeholder="Aguardando informações da conversa..."
                    />
                </div>
            </div>
  
            <div className="p-3 border-t flex gap-2 justify-between flex-shrink-0">
                <button className="px-6 py-2 font-medium text-sm bg-gray-100 hover:bg-gray-300 rounded-lg transition-colors">
                    Cancelar
                </button>
                <button className="px-6 py-2 font-medium text-sm bg-[var(--green-primary)] text-white rounded-lg hover:bg-green-700 transition-colors">
                    Publicar Ideia
                </button>
            </div>
        </div>
    );
}; 

export default ChatInitiativePreview;