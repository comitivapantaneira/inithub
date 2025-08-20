import { getStatusStyles, getStatusIcon } from "@/utils/functions/functionsInitiative";
import { convertDateToString } from "@/utils/functions/functionsInitiative";
import type { Initiative } from "@/types/initiative";

interface InitiativeHeaderProps {
  initiative: Initiative;
}

const InitiativeHeader = ({ initiative }: InitiativeHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{initiative.author.emojiAvatar || '👤'}</div>
        <div className="flex flex-col leading-tight">
          <h3 className="font-semibold text-gray-900">{initiative.author.name || 'Nome não disponível'}</h3>
          <p className="text-sm text-gray-500">
            {initiative.author.department || 'Departamento não disponível'} • {convertDateToString(new Date(initiative.createdAt))}
          </p>
        </div>
      </div>
      
      <div className={`px-3 py-1 rounded-full flex items-center space-x-1 text-xs ${getStatusStyles(initiative.status)}`}>
        <img src={getStatusIcon(initiative.status)} alt={initiative.status} className="w-4 h-4" />
        <span className="capitalize">{initiative.status.replace("_", " ")}</span>
      </div>
    </div>
  );
};

export default InitiativeHeader;