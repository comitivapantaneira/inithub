import { useEffect, useState } from 'react';
import InitiativeCard from '@/components/features/initiatives/InitiativeCard';
import Initiatives from '@/utils/data/initiatives-data';
import type { Initiative } from '@/types/initiative';

const MyInitiatives = () => {
    const [initiatives, setInitiatives] = useState<Initiative[]>([]);
    const [managedInitiatives, setManagedInitiatives] = useState<Initiative[]>([]);

    const userId = 'user-123';

    useEffect(() => {
        const userInitiatives = Initiatives.filter(initiative => initiative.assignedById === userId);
        setInitiatives(userInitiatives);

        const managed = Initiatives.filter(initiative => initiative.assignedToId === userId);
        setManagedInitiatives(managed);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="mb-12">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Minhas Iniciativas</h4>
                    {initiatives.length === 0 ? (
                        <p className="text-gray-600 text-center">Nenhuma proposta foi cadastrada por você até o momento. Para começar, crie uma nova iniciativa.</p>
                    ) : (
                        <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
                            {initiatives.map(initiative => (
                                <InitiativeCard key={initiative.id} initiative={initiative} isManaged={false}/>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Iniciativas que Gerencio</h4>
                    {managedInitiatives.length === 0 ? (
                        <p className="text-gray-600 text-center">Nenhuma iniciativa está sob sua gestão no momento.</p>
                    ) : (
                        <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
                            {managedInitiatives.map(initiative => (
                                <InitiativeCard key={initiative.id} initiative={initiative} isManaged={true}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyInitiatives;