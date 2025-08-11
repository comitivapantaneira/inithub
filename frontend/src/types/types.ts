type InitiativeStatus = "APPROVED" | "IN_PROGRESS" | "PENDING";
type PermissionType = "GENERAL" | "SPECIFIC";

type UserOrganization = {
    organization: Organization;
    permission: PermissionType;
};

type User = {
    name: string;
    email: string;
    role: string;
    cpf: string;
    password: string;
    organizations: UserOrganization[];
};

type Organization = {
    name: string;
    cnpj: string;
    corporateEmail: string;
    businessSector: string;
    sectors: string[];
    logo?: string;
    users: {
        user: User;
        permission: PermissionType;
    }[];
    initiatives: Initiative[];
};

type Comment = {
    author: User;
    content: string;
    createdAt: Date;
    likes: User[];
    replies: Comment[];
};

type Initiative = {
    title: string;
    author: User;
    responsibleUser: User;
    description: string;
    keywords: string[];
    completionPercentage: number;
    status: InitiativeStatus;
    likes: User[];
    comments: Comment[];
    category: string;
    expectedResults: string;
    involvedSectors: string[];
    organization: Organization;
};
