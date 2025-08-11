import { Label } from "@/ui/label";
import { Input } from "@/ui/input";

const ChatInitiativePreview = () => {
    return (
        <div className="bg-white rounded-lg">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg text-gray-800">Preview da Ideia</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">
                    Estrutura que será criada baseada na conversa.
                </p>
                <p className="text-sm font-medium text-gray-500 mt-1">
                    Edite se necessário e publique!
                </p>
            </div>
  
            <div className="p-4 space-y-4">
                <div>
                    <Label htmlFor="initiative-title">Título</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-title" 
                        type="text" 
                        placeholder="..." 
                        required 
                    />
                </div>
    
                <div>
                    <Label htmlFor="initiative-title">Categoria</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-category" 
                        type="text" 
                        placeholder="..." 
                        required 
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-title">Setores Envolvidos</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-sectors" 
                        type="text" 
                        placeholder="..." 
                        required 
                    />
                </div>
    
                <div>
                    <Label htmlFor="initiative-title">Beneficios</Label>
                    <Input 
                        className="bg-gray-100"
                        id="initiative-benefits" 
                        type="text" 
                        placeholder="..." 
                        required 
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-description">Descrição</Label>
                    <textarea
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg resize-none"
                        id="initiative-description"
                        rows={4}
                    />
                </div>
            </div>
  
            <div className="p-4 border-t flex gap-2 justify-between">
                <button className="px-8 py-2 font-medium text-sm bg-gray-100 hover:bg-gray-300 rounded-lg transition-colors">
                    Cancelar
                </button>
                <button className="px-8 py-2 font-medium text-sm bg-[var(--green-primary)] text-white rounded-lg hover:bg-green-700 transition-colors">
                    Publicar Ideia
                </button>
            </div>
        </div>
    );
}; 

export default ChatInitiativePreview;