import type { Initiative } from "@/types/initiative";
import CommentItem from "@/components/features/comments/CommentItem";
import CommentInput from "@/components/features/comments/CommentInput";
import { useComments } from "@/hooks/useComments";

interface CommentSectionProps {
  initiative: Initiative;
}

const CommentSection = ({ initiative }: CommentSectionProps) => {
  const {
    comments,
    commentText,
    setCommentText,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    expandedReplies,
    currentUser,
    handleCommentLike,
    handleCommentSubmit,
    handleReplySubmit,
    toggleReplies
  } = useComments(initiative.comments, initiative);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center">
          Comments ({comments.length})
        </h4>
        
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyText={replyText}
            setReplyText={setReplyText}
            expandedReplies={expandedReplies}
            onCommentLike={handleCommentLike}
            onReplySubmit={handleReplySubmit}
            onToggleReplies={toggleReplies}
          />
        ))}
      </div>

      <CommentInput
        currentUser={currentUser}
        commentText={commentText}
        setCommentText={setCommentText}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default CommentSection;
