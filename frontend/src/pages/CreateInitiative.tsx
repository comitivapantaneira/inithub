import ConversationAgent from "@/components/features/chat/ChatMessages";
import PreviewPanel from "@/components/features/chat/ChatInitiativePreview";
  
const CreateInitiative = () => {
    return (
        <div className="min-h-screen max-w-6xl mx-auto px-4 py-8 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 ">
                <div className="bg-slate-50 h-full lg:col-span-3">
                    <ConversationAgent />
                </div>
            
                <div className="bg-slate-50 h-full lg:col-span-2">
                    <PreviewPanel />
                </div>
            </div>
        </div>   
    );
};
  
export default CreateInitiative;
