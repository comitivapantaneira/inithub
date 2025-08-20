import { Check, X } from "lucide-react";
import { useState } from "react";

interface AddStepFormProps {
  onSave: (content: string) => void;
  onCancel: () => void;
}

const AddStepForm = ({ onSave, onCancel }: AddStepFormProps) => {
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (content.trim()) {
      onSave(content.trim());
      setContent("");
    }
  };

  return (
    <div className="border-2 border-dashed border-green-300 rounded-lg p-6 bg-green-50">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição do Passo
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
            placeholder="Descreva o progresso ou passo realizado..."
          />
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="bg-[var(--green-primary)] hover:bg-green-700 transition-colors duration-200 text-white text-sm px-6 py-2 rounded-lg flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Salvar</span>
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm px-6 py-2 rounded-lg flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStepForm;
