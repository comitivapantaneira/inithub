import { ArrowRight, Heart, MessageCircle, Share2, Settings } from "lucide-react";
import type { Initiative } from "@/types/initiative";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  initiative: Initiative;
  onToggleComments: () => void;
  isManaged?: boolean;
}

const ActionButtons = ({ initiative, onToggleComments, isManaged = false }: ActionButtonsProps) => {
  const navigate = useNavigate();

  const handleProgressClick = () => {
    navigate(`/initiatives/${initiative.id}/progress`);
  };

  return (
    <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-sm">{initiative.likes.length}</span>
        </button>

        <button 
          onClick={onToggleComments}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{initiative.comments.length}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Compartilhar</span>
        </button>
      </div>

      {initiative.status === "IN_EXECUTION" && (
        <button 
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors"
          onClick={handleProgressClick}
        >
          {isManaged ? (
            <>
              <span>Gerenciar</span>
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            </>
          ) : (
            <>
              <span>Progresso</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
