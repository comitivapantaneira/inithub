type NavLink = {
    label: string;
    path: string;
    onlySpecific?: boolean;
};
  
type Message = {
    id: string;
    author: "ia" | "user";
    text: string;
};

export type {
    NavLink,
    Message
}; 