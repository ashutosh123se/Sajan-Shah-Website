import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  isEditor: () => boolean;
  isShopManager: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isAuthenticated: false,

  setAuth: (user: User, token: string) => {
    localStorage.setItem('accessToken', token);
    set({ user, accessToken: token, isAuthenticated: true, isLoading: false });
  },

  clearAuth: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  isAdmin: () => {
    const { user } = get();
    return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  },

  isSuperAdmin: () => {
    const { user } = get();
    return user?.role === 'SUPER_ADMIN';
  },

  isEditor: () => {
    const { user } = get();
    return user?.role === 'EDITOR' || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  },

  isShopManager: () => {
    const { user } = get();
    return user?.role === 'SHOP_MANAGER' || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  },
}));
