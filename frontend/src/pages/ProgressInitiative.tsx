import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import UpdatesTimeline from "@/components/features/progress/UpdatesTimeline";
import InitiativeUpdatesData from "@/utils/data/updates-initiative-data";
import Initiatives from "@/utils/data/initiatives-data";
import UserData from "@/utils/data/user-data";
import type { Initiative, InitiativeUpdate } from '@/types/initiative';

const ProgressInitiative = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initiative, setInitiative] = useState<Initiative | null>(null);
  const [updates, setUpdates] = useState<InitiativeUpdate[]>([]);
  const [isAddingStep, setIsAddingStep] = useState(false);

  const userId = 'user-123'; // Simulando o ID do usuário logado e possui acesso à iniciativa, qualquer usuário pode ver o progresso de uma iniciativa, mas apenas o responsável pode editar.
  const isEditable = initiative?.assignedToId === userId;

  useEffect(() => {
    const foundInitiative = Initiatives.find(i => i.id === id);
    setInitiative(foundInitiative ?? null);

    if (foundInitiative) {
      const initiativeUpdates = InitiativeUpdatesData.filter(
        update => update.initiativeId === foundInitiative.id
      );
      setUpdates(initiativeUpdates);
    }
  }, [id]);

  const goToPreviousScreen = () => navigate(-1);

  const handleAddStepContent = (content: string) => {
    if (!isEditable) return;
    
    const newUpdate: InitiativeUpdate = {
      id: `update-${Date.now()}`,
      initiativeId: initiative?.id || '',
      authorId: UserData.id,
      content,
      createdAt: new Date(),
      isCompleted: false,
      author: UserData,
      initiative: null as any
    };
    setUpdates(prev => [...prev, newUpdate]);
    setIsAddingStep(false);
  };

  const handleDeleteStep = (id: string) => {
    if (!isEditable) return;
    setUpdates(prev => prev.filter(u => u.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    if (!isEditable) return;
    setUpdates(prev => prev.map(u => u.id === id ? { ...u, isCompleted: !u.isCompleted } : u));
  };

  const handleEditStep = (id: string, content: string) => {
    if (!isEditable) return;
    setUpdates(prev => prev.map(u => u.id === id ? { ...u, content } : u));
  };

  if (!initiative) return <div className="flex items-center justify-center w-screen">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 space-x-1 mb-2">
              <button
                onClick={goToPreviousScreen}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-900" />
              </button>
              <h2 className="font-semibold text-md text-gray-900">Trabalho em Progresso</h2>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div>
                <h1 className="text-lg font-bold text-gray-900 mb-3">{initiative.title}</h1>
                <p className="text-sm text-gray-500 mb-2">{initiative.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500">
                  <span>Iniciativa proposta por <strong>{initiative.author.name}</strong></span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    Designada para <strong>{initiative.assignedTo?.name ?? 'Ninguém'}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <UpdatesTimeline
          updates={updates}
          isAdding={isAddingStep}
          onRequestAdd={() => isEditable && setIsAddingStep(true)}
          onCancelAdd={() => setIsAddingStep(false)}
          onConfirmAdd={handleAddStepContent}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteStep}
          onEdit={handleEditStep}
          editable={isEditable}
        />
      </div>
    </div>
  );
};

export default ProgressInitiative;