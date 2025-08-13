import { Heart, Reply, ChevronDown, ChevronUp } from "lucide-react";
import { ReplyInput } from "@/components/features/comments/ReplyInput";
import { ReplyList } from "@/components/features/comments/ReplyList";
import { convertDateToString } from "@/utils/functions/functionsInitiative";
import type { Comment } from "@/types/initiative";

interface CommentItemProps {
  comment: Comment;
  replyingTo: string | null;
  setReplyingTo: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  expandedReplies: Set<string>;
  onCommentLike: (commentId: string) => void;
  onReplySubmit: (parentCommentId: string) => void;
  onToggleReplies: (commentId: string) => void;
}

export const CommentItem = ({
  comment,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  expandedReplies,
  onCommentLike,
  onReplySubmit,
  onToggleReplies
}: CommentItemProps) => {
  return (
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-start space-x-3">
          <div className="text-lg">{comment.user.emojiAvatar}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm text-gray-900">{comment.user.name}</span>
              <span className="text-xs text-gray-500">{convertDateToString(comment.createdAt)}</span>
            </div>
            <p className="text-sm text-gray-800">{comment.content}</p>
            
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => onCommentLike(comment.id)}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                <Heart className={`w-3 h-3 ${comment.likes.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{comment.likes.length}</span>
              </button>
              
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Reply className="w-3 h-3" />
                <span>Responder</span>
              </button>

              {comment.replies.length > 0 && (
                <button
                  onClick={() => onToggleReplies(comment.id)}
                  className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {expandedReplies.has(comment.id) ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      <span>Esconder {comment.replies.length} respostas</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      <span>Visualizar {comment.replies.length} respostas</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {replyingTo === comment.id && (
          <ReplyInput
            replyText={replyText}
            setReplyText={setReplyText}
            onReplySubmit={() => onReplySubmit(comment.id)}
          />
        )}
      </div>

      {expandedReplies.has(comment.id) && comment.replies.length > 0 && (
        <ReplyList replies={comment.replies} />
      )}
    </div>
  );
};
