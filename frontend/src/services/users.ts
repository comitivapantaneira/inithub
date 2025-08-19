import api from "@/services/api";
import type { User } from "@/types/user";

class UsersService {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/users");
    return response.data;
  }
}

export const usersService = new UsersService();
