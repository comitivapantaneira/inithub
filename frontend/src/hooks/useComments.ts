import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { initiativesService } from "@/services/initiatives";
import type { Comment, Initiative } from "@/types/initiative";
import type { User } from "@/types/user";

export const useComments = (
    initialComments: Comment[],
    initiative: Initiative,
    onCommentAdded?: (comment: Comment) => void,
    onCommentRemoved?: (commentId: string) => void,
) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [commentText, setCommentText] = useState("");
    const { user } = useAuth();

    const currentUser = user ?? initiative.author;

    const handleCommentSubmit = () => {
        if (commentText.trim() === "" || !user) return;

        initiativesService.createComment(initiative.id, commentText, user.id)
            .then((res) => {
                const newComment: Comment = {
                    id: res?.data?.id ?? `comment-${Date.now()}`,
                    content: commentText,
                    createdAt: new Date(),
                    userId: user.id,
                    initiativeId: initiative.id,
                    user: currentUser as User,
                    initiative: initiative,
                };
                setComments((prev) => [...prev, newComment]);
                if (typeof onCommentAdded === 'function') onCommentAdded(newComment);
                setCommentText("");
            })
            .catch(() => {
                console.log("Error creating comment");
            });
    };

    const handleDeleteComment = (commentId: string) => {
        if (!user) return;
            initiativesService.deleteComment(initiative.id, commentId, user.id)
                .then(() => {
                    setComments((prev) => prev.filter(c => c.id !== commentId));
                    if (typeof onCommentRemoved === 'function') onCommentRemoved(commentId);
                })
                .catch(() => {
                    console.log("Error deleting comment");
                });
    };

    return {
        comments,
        commentText,
        setCommentText,
        currentUser,
        handleCommentSubmit,
        handleDeleteComment,
    };
};
