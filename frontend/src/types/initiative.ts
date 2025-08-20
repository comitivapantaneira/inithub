import type { User } from "./user";

type InitiativeStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "IN_EXECUTION"
  | "COMPLETED";

type Like = {
  id: string;
  userId: string;
  initiativeId: string;
  createdAt: Date;
  user: User;
  initiative: Initiative;
}

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  initiativeId: string;
  user: User;
  initiative: Initiative;
};

type Initiative = {
  id: string;
  title: string;
  authorId: string;
  description: string;
  theme: string;
  context: string;
  deliverable: string;
  evaluationCriteria: string;
  status: InitiativeStatus;
  assignedToId?: string | null;
  assignedById?: string | null;
  assignedAt?: Date | null;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  comments: Comment[];
  updates: InitiativeUpdate[];
  author: User;
  assignedTo?: User | null;
  assignedBy?: User | null;
};

type InitiativeUpdate = {
  id: string;
  initiativeId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  initiative: Initiative;
  isCompleted: boolean;
  isEditing?: boolean;
  author: User;
};

export type {
  Initiative,
  Like,
  InitiativeUpdate,
  Comment,
  InitiativeStatus,
};
