import { useMemo, useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import type { Initiative } from '@/types/initiative';
import { initiativesService } from '@/services/initiatives';

interface FiltersProps {
    initiatives: Initiative[];
    onChange?: (params: { categories?: string[]; statuses?: string[]; sort?: string }) => void;
}

const statuses = [
    { value: 'PENDING', label: 'Pendente' },
    { value: 'APPROVED', label: 'Aprovada' }, 
    { value: 'REJECTED', label: 'Rejeitada' },
    { value: 'IN_EXECUTION', label: 'Em Execução' },
    { value: 'COMPLETED', label: 'Concluída' }
];

const Filters = ({initiatives, onChange}: FiltersProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [sort, setSort] = useState('likes_desc');

    const toggleFilters = () => setIsOpen(!isOpen);

    const categories = useMemo(() => {
        const set = new Set<string>();
        initiatives.forEach(i => { if (i.theme) set.add(i.theme); });
        return Array.from(set);
    }, [initiatives]);

    const applyFilters = async (params?: { categories?: string[]; statuses?: string[]; sort?: string }) => {
        const p = params ?? { categories: selectedCategories, statuses: selectedStatuses, sort };
        if (onChange) {
            onChange(p);
            return;
        }
        try {
            const data = await initiativesService.getInitiatives(p);
            // @ts-ignore
            if (window.__setInitiativesFromFilters) window.__setInitiativesFromFilters(data);
        } catch (err) {
            console.error('Erro ao aplicar filtros', err);
        }
    };

    const toggleSelection = (value: string, list: string[], setList: (v: string[]) => void) => {
        if (list.includes(value)) setList(list.filter(x => x !== value));
        else setList([...list, value]);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <button 
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={toggleFilters}
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filtrar</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}/>
                    </button>
                    <span className="text-sm text-gray-500">Mostrando {initiatives.length} iniciativas</span>
                </div>
            </div>
            
            {isOpen && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Categoria</label>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {categories.length === 0 && <div className="text-sm text-gray-500">Nenhuma categoria disponível</div>}
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedCategories.includes(cat)} 
                                            onChange={() => toggleSelection(cat, selectedCategories, setSelectedCategories)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {statuses.map(s => (
                                    <label key={s.value} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedStatuses.includes(s.value)} 
                                            onChange={() => toggleSelection(s.value, selectedStatuses, setSelectedStatuses)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{s.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                            <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
                            <select 
                                value={sort} 
                                onChange={(e) => setSort(e.target.value)} 
                                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                            >
                                <option value="likes_desc">Mais curtidas</option>
                                <option value="likes_asc">Menos curtidas</option>
                                <option value="createdAt_desc">Mais recentes</option>
                                <option value="createdAt_asc">Mais antigas</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                            <button 
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setSelectedStatuses([]);
                                    setSort('likes_desc');
                                    applyFilters({ categories: [], statuses: [], sort: 'likes_desc' });
                                }}
                                className="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Limpar
                            </button>
                            <button 
                                onClick={() => applyFilters({ categories: selectedCategories, statuses: selectedStatuses, sort })} 
                                className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Aplicar filtros
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Filters;
