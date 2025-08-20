import { useState } from "react";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { getAuthorInitials } from "@/utils/functions/functionsAuthor";
import { convertDateToString } from "@/utils/functions/functionsInitiative";
import type { InitiativeUpdate } from "@/types/initiative";

interface TimelineStepItemProps {
  update: InitiativeUpdate;
  index: number;
  total: number;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  editable?: boolean;
}

const TimelineStepItem = ({
  update,
  index,
  total,
  onToggleComplete,
  onDelete,
  onEdit,
  editable = false,
}: TimelineStepItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(update.content);

  const handleSave = () => {
    if (!editable) return;
    onEdit(update.id, draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(update.content);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    if (!editable) return;
    onToggleComplete(update.id);
  };

  const handleDelete = () => {
    if (!editable) return;
    onDelete(update.id);
  };

  const handleEditClick = () => {
    if (!editable) return;
    setIsEditing(true);
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex flex-col items-center">
        <button
          onClick={handleToggleComplete}
          disabled={!editable}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            update.isCompleted
              ? "bg-green-500 border-green-500 text-white"
              : editable 
                ? "border-gray-300 hover:border-green-400 cursor-pointer" 
                : "border-gray-300 cursor-default"
          }`}
        >
          {update.isCompleted && <Check className="w-3 h-3" />}
        </button>
        {index < total - 1 && <div className="w-0.5 h-16 bg-gray-200 mt-2" />}
      </div>

      <div
        className={`flex-1 p-4 rounded-lg ${
          update.isCompleted ? "bg-[var(--background-completed)]" : "bg-gray-50"
        }`}
      >
        {isEditing && editable ? (
            <div className="space-y-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Cancelar</span>
                </button>
              </div>
            </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                  {getAuthorInitials(update.author?.name || 'Usuario')}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Atualização Postada
                  </div>
                  <div className="text-sm text-gray-500">
                    {update.author?.name || 'Usuário desconhecido'}
                  </div>
                </div>
              </div>

              {editable && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEditClick}
                    className="text-gray-400 hover:text-blue-500 p-1"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {update.content}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default TimelineStepItem;
