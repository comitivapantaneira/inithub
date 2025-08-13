import type { InitiativeUpdate } from "@/types/initiative";
import UserData from "@/utils/data/user-data";

const InitiativeUpdatesData: InitiativeUpdate[] = [
  {
    id: "update-001",
    initiativeId: "initiative-001",
    authorId: UserData.id,
    content: "The AI chatbot has been successfully integrated with our support system. Initial tests show it can handle 75% of common queries without human intervention.",
    createdAt: new Date("2024-07-05"),
    isCompleted: true,
    isEditing: false,
    author: UserData,
    initiative: null as any,
  },
  {
    id: "update-002",
    initiativeId: "initiative-001",
    authorId: UserData.id,
    content: "The wellness program has been launched with an initial workshop on mental health resources. Feedback from participants has been positive.",
    createdAt: new Date("2024-07-22"),
    isCompleted: false,
    isEditing: false,
    author: UserData,
    initiative: null as any,
  },
  {
    id: "update-003",
    initiativeId: "initiative-001",
    authorId: UserData.id,
    content: "The sustainability initiative is in the research phase. We are currently analyzing our supply chain practices and identifying areas for improvement.",
    createdAt: new Date("2024-07-25"),
    isCompleted: false,
    isEditing: false,
    author: UserData,
    initiative: null as any,
  }
];

export default InitiativeUpdatesData;
