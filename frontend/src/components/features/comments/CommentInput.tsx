import type { User } from "@/types/user";

interface CommentInputProps {
  currentUser: User;
  commentText: string;
  setCommentText: (text: string) => void;
  onCommentSubmit: () => void;
}

export const CommentInput = ({ 
  currentUser, 
  commentText, 
  setCommentText, 
  onCommentSubmit 
}: CommentInputProps) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex space-x-3">
        <div className="text-lg">{currentUser.emojiAvatar}</div>
        <div className="flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Escreva um comentário..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
          />
          <button
            onClick={onCommentSubmit}
            disabled={!commentText.trim()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Enviar Comentário
          </button>
        </div>
      </div>
    </div>
  );
};