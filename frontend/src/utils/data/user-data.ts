import type { User } from "@/types/user";

const UserData: User = {
    id: "user-123",
    email: "inithub@gmail.com",
    name: "Comitiva Pantaneira",
    department: "Inovação",
    emojiAvatar: "🦜",
    isAdmin: true,
    createdAt: new Date("2023-01-15T10:00:00Z"),
    updatedAt: new Date("2024-06-20T15:30:00Z"),
    initiativesAuthored: [],
    initiativesAssignedTo: [],
    initiativesAssignedBy: [],
    likes: [],
    comments: [],
    updates: []
}

export default UserData;
