import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

export const useAuth = () => {
  const { user, accessToken, isAuthenticated, setAuth, clearAuth, setLoading } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          setLoading(true);
          const response = await api.get('/auth/me');
          setAuth(response.data.data.user, token);
        } catch (error) {
          // Token is invalid, clear it
          clearAuth();
        } finally {
          setLoading(false);
        }
      }
    };

    initializeAuth();
  }, [setAuth, clearAuth, setLoading]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });
      const { accessToken: token, user: userData } = response.data.data;
      setAuth(userData, token);
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', { name, email, password });
      const { accessToken: token, user: userData } = response.data.data;
      setAuth(userData, token);
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Even if logout fails on server, clear local auth
    } finally {
      clearAuth();
    }
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
