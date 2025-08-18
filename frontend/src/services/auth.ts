import api from "./api";

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  emojiAvatar?: string;
  department?: string;
}

export interface LoginResponse {
  user: User;
  isAuthenticated: boolean;
}

export interface UserAuthData {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  emojiAvatar?: string;
  department?: string;
}

class AuthService {
  async getUserForAuth(userId: string): Promise<UserAuthData> {
    try {
      const response = await api.get(`/auth/user?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw error;
    }
  }

  async login(email: string, password?: string): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/login', {
        email,
        password: password || 'any-password' // Para MVP, qualquer senha é aceita
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  saveUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  }

  getUserFromLocalStorage(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }
}

export const authService = new AuthService();
