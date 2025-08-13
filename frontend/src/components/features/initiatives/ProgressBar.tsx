import { calcProgress } from "@/utils/functions/functionsInitiative";
import type { Initiative } from "@/types/initiative";
import IconTarget from '@/assets/icons/icon-target.svg';

interface ProgressBarProps {
  initiative: Initiative;
}

const ProgressBar = ({ initiative }: ProgressBarProps) => {
  if (initiative.status !== "IN_EXECUTION") return null;

  const progress = calcProgress(initiative);

  return (
    <div className="bg-purple-50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img src={IconTarget} alt="Target Icon" className="w-5 h-5" />
          <span className="text-sm font-medium text-purple-900">
            Atribuído a {initiative.assignedTo?.name}
          </span>
        </div>
        <span className="text-sm font-medium text-purple-900">
          {progress}% Completo
        </span>
      </div>
      <div className="w-full bg-purple-200 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;