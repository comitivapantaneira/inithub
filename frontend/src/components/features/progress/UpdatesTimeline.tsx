import { Plus } from "lucide-react";
import type { InitiativeUpdate } from "@/types/initiative";
import AddStepForm from "@/components/features/progress/AddStepForm";
import TimelineStepItem from "@/components/features/progress/TimelineStepItem";

interface UpdatesTimelineProps {
  updates: InitiativeUpdate[];
  isAdding: boolean;
  onRequestAdd: () => void;
  onCancelAdd: () => void;
  onConfirmAdd: (content: string) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export function UpdatesTimeline({
  updates,
  isAdding,
  onRequestAdd,
  onCancelAdd,
  onConfirmAdd,
  onToggleComplete,
  onDelete,
  onEdit,
}: UpdatesTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-md font-bold text-gray-900">Timeline de Execução</h2>
        {!isAdding && (
          <button
            onClick={onRequestAdd}
            className="text-white text-sm px-6 py-2 rounded-lg font-medium flex items-center space-x-2 shadow-sm bg-[var(--green-primary)] hover:bg-green-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Passo</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {isAdding && (
          <AddStepForm
            onCancel={onCancelAdd}
            onSave={(content) => onConfirmAdd(content)}
          />
        )}

        {updates.map((u, i) => (
          <TimelineStepItem
            key={u.id}
            update={u}
            index={i}
            total={updates.length}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}

        {updates.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum passo registrado ainda.</p>
            <p className="text-sm">
              Clique em "Adicionar Passo" para começar a documentar o progresso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
