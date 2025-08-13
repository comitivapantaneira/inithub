interface ReplyInputProps {
  replyText: string;
  setReplyText: (text: string) => void;
  onReplySubmit: () => void;
}
  
const ReplyInput = ({ replyText, setReplyText, onReplySubmit }: ReplyInputProps) => {
  return (
    <div className="mt-3 ml-8">
      <div className="flex space-x-2">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Escreva uma resposta..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
        />
        <button
          onClick={onReplySubmit}
          disabled={!replyText.trim()}
          className="px-3 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
  