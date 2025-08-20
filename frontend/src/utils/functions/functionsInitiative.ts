import type { Initiative } from "@/types/initiative";
import IconAprovado from '@/assets/icons/icon-approved.svg';
import IconArquivado from '@/assets/icons/icon-rejected.svg';
import IconCompleto from '@/assets/icons/icon-completed.svg';
import IconExecution from '@/assets/icons/icon-execution.svg';
import IconPending from '@/assets/icons/icon-pending.svg';

export function getStatusStyles(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-[var(--background-pending)] text-[var(--text-pending)] font-bold text-xs";
    case "APPROVED":
      return "bg-[var(--background-approved)] text-[var(--text-approved)] font-bold text-xs";
    case "REJECTED":
      return "bg-[var(--background-rejected)] text-[var(--text-rejected)] font-bold text-xs";
    case "IN_EXECUTION":
      return "bg-[var(--background-in-execution)] text-[var(--text-in-execution)] font-bold text-xs";
    case "COMPLETED":
      return "bg-[var(--background-completed)] text-[var(--text-completed)] font-bold text-xs";
  }
}

export function getStatusIcon(status: string) {
  switch (status) {
    case "PENDING":
      return IconPending;
    case "APPROVED":
      return IconAprovado;
    case "REJECTED":
      return IconArquivado;
    case "IN_EXECUTION":
      return IconExecution;
    case "COMPLETED":
      return IconCompleto;
  }
}

export function convertDateToString(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export function calcProgress(initiative: Initiative) {
  if (!initiative.updates || initiative.updates.length === 0) {
    return 0;
  }

  const completedUpdates = initiative.updates.filter(update => update.isCompleted).length;
  return Math.round((completedUpdates / initiative.updates.length) * 100);
}

export function getLikeButtonStyles(isLiked: boolean) {
  return `flex items-center space-x-2 transition-colors ${
    isLiked 
      ? 'text-red-600' 
      : 'text-gray-600 hover:text-red-600'
  }`;
}
