// mock em nivel de frontend
import { useState } from "react";
import type { Comment, Initiative } from "@/types/initiative";

export const useComments = (initialComments: Comment[], initiative: Initiative) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [commentText, setCommentText] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");
    const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

     const currentUser = initiative.author;

    const handleCommentLike = (commentId: string) => {
        setComments((prev) => 
            prev.map(comment => {
                if (comment.id === commentId) {
                    const isAlreadyLiked = comment.likes.some(like => like.userId === currentUser.id);
                    if (!isAlreadyLiked) {
                        const newLike = {
                        id: `like-${Date.now()}`,
                        userId: currentUser.id,
                        initiativeId: initiative.id,
                        createdAt: new Date(),
                        user: currentUser,
                        initiative: initiative
                        };
                        return {
                        ...comment,
                        likes: [...comment.likes, newLike]
                        };
                    }
                }
                return comment;
            })
        );
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() === "") return;

        const newComment: Comment = {
            id: `comment-${Date.now()}`,
            content: commentText,
            createdAt: new Date(),
            userId: currentUser.id,
            initiativeId: initiative.id,
            user: currentUser,
            initiative: initiative,
            likes: [],
            replies: [],
        };

        setComments((prev) => [...prev, newComment]);
        setCommentText("");
    };

    const handleReplySubmit = (parentCommentId: string) => {
        if (replyText.trim() === "") return;

        const newReply: Comment = {
        id: `reply-${Date.now()}`,
        content: replyText,
        createdAt: new Date(),
        userId: currentUser.id,
        initiativeId: initiative.id,
        user: currentUser,
        initiative: initiative,
        likes: [],
        replies: [],
        };

        setComments((prev) => 
            prev.map(comment => {
                if (comment.id === parentCommentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, newReply]
                };
                }
                return comment;
            })
        );

        setReplyText("");
        setReplyingTo(null);
    };

    const toggleReplies = (commentId: string) => {
        setExpandedReplies(prev => {
            const newSet = new Set(prev);
            
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

    return {
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
    };
};
