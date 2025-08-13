import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import type { Initiative } from '@/types/initiative';

interface FiltersProps {
    initiatives: Initiative[];
}

const Filters = ({initiatives}: FiltersProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [searchText, setSearchText] = useState('');

    const toggleFilters = () => {
        setIsOpen(!isOpen);
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoria
                            </label>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white ${
                                    selectedCategory === '' ? 'text-gray-400' : 'text-gray-900'
                                }`}
                            >
                                <option value="">Selecione uma categoria</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select 
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white ${
                                    selectedCategory === '' ? 'text-gray-400' : 'text-gray-900'
                                }`}
                            >
                                <option value="">Selecione um status</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Setor
                            </label>
                            <select 
                                value={selectedSector}
                                onChange={(e) => setSelectedSector(e.target.value)}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white ${
                                    selectedCategory === '' ? 'text-gray-400' : 'text-gray-900'
                                }`}
                            >
                                <option value="">Selecione um setor</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Busca por Assistente
                        </label>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Descreva a iniciativa"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Filters;
