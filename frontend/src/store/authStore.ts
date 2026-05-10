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
  isSubscriber: () => boolean;
  isCustomer: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isAuthenticated: false,

  setAuth: (user: User, token: string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, accessToken: token, isAuthenticated: true, isLoading: false });
  },

  clearAuth: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
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

  isSubscriber: () => {
    const { user } = get();
    return user?.role === 'SUBSCRIBER' || user?.role === 'MEMBER' || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  },

  isCustomer: () => {
    const { user } = get();
    return user?.role === 'CUSTOMER' || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'SHOP_MANAGER';
  },
}));
