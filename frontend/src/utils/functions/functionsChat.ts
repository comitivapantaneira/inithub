export function getMessageClasses(author: string) {
  return author === "user"
    ? "bg-gray-200 text-gray-800"
    : "bg-gray-300 text-gray-800";
}
  
export function getAvatarClasses(author: string) {
  return author === "user"
    ? "w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0"
    : "w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0";
}
  
export function getAvatarEmoji(author: string) {
  return author === "user" ? "👤" : "🤖";
}