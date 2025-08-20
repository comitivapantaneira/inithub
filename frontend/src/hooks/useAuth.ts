import { useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import type { User } from '@/services/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authenticated = authService.isAuthenticated();
    const userData = authService.getUserFromLocalStorage();

    setIsAuthenticated(authenticated);
    setUser(userData);
    setLoading(false);
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout,
    updateUser
  };
};
