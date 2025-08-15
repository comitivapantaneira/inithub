import ConversationAgent from "@/components/features/chat/ChatMessages";
import PreviewPanel from "@/components/features/chat/ChatInitiativePreview";
import { InitiativeProvider } from "@/contexts/InitiativeContext";
  
const CreateInitiative = () => {
    return (
        <InitiativeProvider>
            <div className="h-full max-w-6xl mx-auto px-4 py-2 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 h-full">
                    <div className="bg-slate-50 lg:col-span-3 h-full overflow-hidden">
                        <ConversationAgent />
                    </div>
                
                    <div className="bg-slate-50 lg:col-span-2 h-full overflow-hidden">
                        <PreviewPanel />
                    </div>
                </div>
            </div>   
        </InitiativeProvider>
    );
};
  
export default CreateInitiative;
