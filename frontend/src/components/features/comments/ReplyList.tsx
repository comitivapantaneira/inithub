import type { Comment } from "@/types/initiative";
import { convertDateToString } from "@/utils/functions/functionsInitiative";

interface ReplyListProps {
  replies: Comment[];
}

export const ReplyList = ({ replies }: ReplyListProps) => {
  return (
    <div className="ml-6 space-y-2">
      {replies.map((reply) => (
        <div key={reply.id} className="bg-gray-25 rounded-lg p-3 border-l-2 border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="text-sm">{reply.user.emojiAvatar}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-xs text-gray-900">{reply.user.name}</span>
                <span className="text-xs text-gray-500">{convertDateToString(reply.createdAt)}</span>
              </div>
              <p className="text-xs text-gray-800">{reply.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};