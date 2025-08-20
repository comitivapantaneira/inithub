import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import type { ChatInitiative } from "@/services/agent";

type Props = {
    initiative: ChatInitiative | null;
    onChange?: (value: ChatInitiative | null) => void;
    onPublish?: () => void;
};

const ChatInitiativePreview = ({ initiative, onChange, onPublish }: Props) => {
    const safe = initiative ?? {};

    const update = (patch: Partial<ChatInitiative>) => {
        onChange?.({ ...safe, ...patch });
    };

    return (
        <div className="bg-white rounded-lg">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg text-gray-800">Preview da Ideia</h2>
            </div>

            <div className="p-4 space-y-4">
                <div>
                    <Label htmlFor="initiative-title">Título</Label>
                    <Input
                        className="bg-gray-100"
                        id="initiative-title"
                        type="text"
                        value={safe.title ?? ""}
                        onChange={(e) => update({ title: e.target.value })}
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-theme">Tema</Label>
                    <Input
                        className="bg-gray-100"
                        id="initiative-theme"
                        type="text"
                        value={safe.theme ?? ""}
                        onChange={(e) => update({ theme: e.target.value })}
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-context">Descrição</Label>
                    <textarea
                        className="w-full text-sm p-3 bg-gray-100 border border-gray-200 rounded-lg resize-none"
                        id="initiative-context"
                        rows={3}
                        value={safe.context ?? ""}
                        onChange={(e) => update({ context: e.target.value })}
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-deliverable">Entregável</Label>
                    <Input
                        className="bg-gray-100"
                        id="initiative-deliverable"
                        type="text"
                        value={safe.deliverable ?? ""}
                        onChange={(e) => update({ deliverable: e.target.value })}
                    />
                </div>

                <div>
                    <Label htmlFor="initiative-evaluation">Critérios de Avaliação</Label>
                    <textarea
                        className="w-full text-sm p-3 bg-gray-100 border border-gray-200 rounded-lg resize-none"
                        id="initiative-evaluation"
                        rows={3}
                        value={safe.evaluationCriteria ?? ""}
                        onChange={(e) => update({ evaluationCriteria: e.target.value })}
                    />
                </div>
            </div>

            <div className="p-4 border-t flex gap-2 justify-between">
                <button className="px-8 py-2 font-medium text-sm bg-gray-100 hover:bg-gray-300 rounded-lg transition-colors">
                    Cancelar
                </button>
                <button
                    className="px-8 py-2 font-medium text-sm bg-[var(--green-primary)] text-white rounded-lg hover:bg-green-700 transition-colors"
                    onClick={onPublish}
                >
                    Publicar Ideia
                </button>
            </div>
        </div>
    );
};

export default ChatInitiativePreview;