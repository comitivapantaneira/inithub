import type { Initiative } from "@/types/initiative";
import CommentItem from "@/components/features/comments/CommentItem";
import CommentInput from "@/components/features/comments/CommentInput";
import { useComments } from "@/hooks/useComments";

interface CommentSectionProps {
  initiative: Initiative;
  onCommentAdded?: (comment: any) => void;
}

const CommentSection = ({ initiative, onCommentAdded }: CommentSectionProps) => {
  const {
    comments,
    commentText,
    setCommentText,
    currentUser,
    handleCommentSubmit,
    handleDeleteComment,
  } = useComments(initiative.comments, initiative, onCommentAdded);

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
            currentUser={currentUser}
            onDeleteComment={handleDeleteComment} 
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
