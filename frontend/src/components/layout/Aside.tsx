import type { Initiative } from "@/types/initiative";

const categories = [
    'Tecnologia',
    'Sustentabilidade',
    'Marketing',
    'Governança',
    'RH',
    'Cultura'
];

type AsideProps = {
  initiatives: Initiative[];
};

const Aside = ({ initiatives }: AsideProps) => {
    const total = initiatives.length;
    const inExecution = initiatives.filter(i => i.status === "IN_EXECUTION").length;
    const completed = initiatives.filter(i => i.status === "COMPLETED").length;
    const pending = initiatives.filter(i => i.status === "PENDING").length;
    const approved = initiatives.filter(i => i.status === "APPROVED").length;
    const rejected = initiatives.filter(i => i.status === "REJECTED").length;
    
    return (
        <div className="w-full lg:w-64 space-y-4 lg:space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <h4 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">Estatísticas</h4>
                <div className="space-y-2 lg:space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs lg:text-sm text-gray-600">Iniciativas Totais</span>
                        <span className="font-semibold text-gray-900 text-sm lg:text-base">{total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs lg:text-sm text-gray-600">Pendentes</span>
                        <span className="font-semibold text-yellow-500 text-sm lg:text-base">{pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs lg:text-sm text-gray-600">Aprovadas</span>
                        <span className="font-semibold text-blue-500 text-sm lg:text-base">{approved}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs lg:text-sm text-gray-600">Rejeitadas</span>
                        <span className="font-semibold text-red-500 text-sm lg:text-base">{rejected}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs lg:text-sm text-gray-600">Em Execução</span>
                        <span className="font-semibold text-purple-600 text-sm lg:text-base">{inExecution}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs lg:text-sm text-gray-600">Concluídas</span>
                        <span className="font-semibold text-green-600 text-sm lg:text-base">{completed}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <h4 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">Categorias</h4>
                <div className="space-y-1 lg:space-y-2">
                    {categories.map((category) => (
                        <button 
                            key={category} 
                            className="w-full text-left px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 lg:p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-xs lg:text-sm text-gray-900">B3</span>
                        <span className="text-xs text-gray-500">Plataforma de Inovação</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aside;
