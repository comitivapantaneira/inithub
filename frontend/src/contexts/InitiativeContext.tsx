import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Initiative } from '@/services/WebSocketAgentService';

interface InitiativeContextType {
  initiative: Initiative | null;
  updateInitiative: (initiative: Initiative | null) => void;
}

const InitiativeContext = createContext<InitiativeContextType | undefined>(undefined);

export const useInitiative = () => {
  const context = useContext(InitiativeContext);
  if (context === undefined) {
    throw new Error('useInitiative must be used within an InitiativeProvider');
  }
  return context;
};

interface InitiativeProviderProps {
  children: ReactNode;
}

export const InitiativeProvider: React.FC<InitiativeProviderProps> = ({ children }) => {
  const [initiative, setInitiative] = useState<Initiative | null>(null);

  const updateInitiative = (newInitiative: Initiative | null) => {
    setInitiative(newInitiative);
  };

  return (
    <InitiativeContext.Provider value={{ initiative, updateInitiative }}>
      {children}
    </InitiativeContext.Provider>
  );
};
