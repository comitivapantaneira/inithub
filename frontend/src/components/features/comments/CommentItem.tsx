import type { Comment } from "@/types/initiative";
import type { User } from "@/services/auth";

interface CommentItemProps {
  comment: Comment;
  currentUser?: User;
  onDeleteComment?: (commentId: string) => void;
}

const CommentItem = ({ comment, currentUser, onDeleteComment }: CommentItemProps) => {
  const canDelete = currentUser && comment.user.id === currentUser.id;
  
  return (
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-start space-x-3">
          <div className="text-lg">{comment.user.emojiAvatar}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-gray-900">{comment.user.name}</span>
                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div>
                {canDelete && onDeleteComment && (
                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-800">{comment.content}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CommentItem;
