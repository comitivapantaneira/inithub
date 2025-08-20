import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import UpdatesTimeline from "@/components/features/progress/UpdatesTimeline";
import ProgressBar from "@/components/features/initiatives/ProgressBar";
import { useAuth } from '@/hooks/useAuth';
import { initiativesService } from '@/services/initiatives';

import type { Initiative, InitiativeUpdate } from '@/types/initiative';

const ProgressInitiative = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [initiative, setInitiative] = useState<Initiative | null>(null);
  const [updates, setUpdates] = useState<InitiativeUpdate[]>([]);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canManage = user && initiative && (
    user.isAdmin ||
    user.id === initiative.assignedToId
  );

  useEffect(() => {
    const loadInitiative = async () => {
      if (!id) {
        setError('ID da iniciativa não fornecido');
        return;
      }

      try {
        const data = await initiativesService.getInitiative(id);
        setInitiative(data);
        setUpdates(data.updates || []);
      } catch (err) {
        console.error('Erro ao carregar iniciativa:', err);
        setError('Erro ao carregar dados da iniciativa');
      } 
    };

    loadInitiative();
  }, [id]);

  const goToPreviousScreen = () => {
    const referrer = document.referrer;
    const isFromSameOrigin = referrer && referrer.startsWith(window.location.origin);
    
    if (isFromSameOrigin) {
      navigate(-1);
    } else {
      if (user?.isAdmin) {
        navigate('/screening');
      } else {
        navigate('/home');
      }
    }
  };

  const handleAddStepContent = async (content: string) => {
    if (!canManage || !user || !initiative) return;
    
    try {
      const newUpdate = await initiativesService.createUpdate(initiative.id, user.id, content);
      const newUpdates = [...updates, newUpdate];
      setUpdates(newUpdates);
      setIsAddingStep(false);
      
      setInitiative({
        ...initiative,
        updates: newUpdates
      });
    } catch (err) {
      console.error('Erro ao adicionar atualização:', err);
    }
  };

  const handleEditStepContent = async (id: string, content: string) => {
    if (!canManage) return;
    
    try {
      const updatedUpdate = await initiativesService.updateUpdateContent(id, content);
      const newUpdates = updates.map(u => u.id === id ? updatedUpdate : u);
      setUpdates(newUpdates);
      
      if (initiative) {
        setInitiative({
          ...initiative,
          updates: newUpdates
        });
      }
    } catch (err) {
      console.error('Erro ao editar atualização:', err);
    }
  };

  const handleDeleteStepContent = async (id: string) => {
    if (!canManage) return;
    
    try {
      await initiativesService.deleteUpdate(id);
      const newUpdates = updates.filter(u => u.id !== id);
      setUpdates(newUpdates);
      
      if (initiative) {
        setInitiative({
          ...initiative,
          updates: newUpdates
        });
      }
    } catch (err) {
      console.error('Erro ao deletar atualização:', err);
    }
  };

  const handleToggleComplete = async (id: string) => {
    if (!canManage) return;
    
    const currentUpdate = updates.find(u => u.id === id);
    if (!currentUpdate) return;
    
    try {
      const updatedUpdate = await initiativesService.updateUpdateStatus(id, !currentUpdate.isCompleted);
      const newUpdates = updates.map(u => u.id === id ? updatedUpdate : u);
      setUpdates(newUpdates);
      
      if (initiative) {
        setInitiative({
          ...initiative,
          updates: newUpdates
        });
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  if (error || !initiative) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Iniciativa não encontrada'}</p>
          <button 
            onClick={goToPreviousScreen}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

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
              <h2 className="font-semibold text-md text-gray-900">
                {canManage ? 'Gerenciar Progresso' : 'Visualizar Progresso'}
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div>
                <h1 className="text-lg font-bold text-gray-900 mb-3">{initiative.title}</h1>
                <p className="text-sm text-gray-500 mb-2">{initiative.description}</p>
                {canManage && (
                  <>
                    <p className="text-sm text-gray-500 mb-2">Contexto: {initiative.context}</p>
                    <p className="text-sm text-gray-500 mb-2">Critérios de Avaliação: {initiative.evaluationCriteria}</p>
                  </>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 mb-3">
                  <span>Iniciativa proposta por <strong>{initiative.author?.name || 'Desconhecido'}</strong></span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    Designada para <strong>{initiative.assignedTo?.name ?? 'Ninguém'}</strong>
                  </span>
                  {user && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        Você está logado como <strong>{user.name}</strong>
                        {user.isAdmin && <span className="text-blue-600 font-medium"> (Admin)</span>}
                      </span>
                    </>
                  )}
                </div>
                
                {canManage && user && (
                  <div className="mt-2 space-y-2">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.isAdmin && '👑 Admin - Pode gerenciar todas as iniciativas'}
                      {!user.isAdmin && user.id === initiative.assignedToId && '🎯 Responsável - Pode gerenciar esta iniciativa'}
                    </div>
                  </div>
                )}
                {!canManage && user && (
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {user.id === initiative.authorId ? '✍️ Autor - Visualização apenas' : '👀 Visualização apenas - Você não tem permissão para editar'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <ProgressBar initiative={initiative} />

        <UpdatesTimeline
          updates={updates}
          isAdding={isAddingStep}
          onRequestAdd={() => canManage && setIsAddingStep(true)}
          onCancelAdd={() => setIsAddingStep(false)}
          onConfirmAdd={handleAddStepContent}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteStepContent}
          onEdit={handleEditStepContent}
          editable={!!canManage}
        />
      </div>
    </div>
  );
};

export default ProgressInitiative;