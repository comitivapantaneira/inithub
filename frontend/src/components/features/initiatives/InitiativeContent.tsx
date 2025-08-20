import type { Initiative } from "@/types/initiative";

interface InitiativeContentProps {
  initiative: Initiative;
}

const InitiativeContent = ({ initiative }: InitiativeContentProps) => {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-bold text-gray-900">{initiative.title}</h2>
      <p className="text-sm text-gray-700">{initiative.description}</p>
    </div>
  );
};

export default InitiativeContent;
