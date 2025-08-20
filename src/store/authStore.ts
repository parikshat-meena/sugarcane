import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../services/AuthService';

type User = { id: string; username: string };

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  infoMessage: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  sendUsernameReminder: (email: string) => Promise<void>;
  startResetPassword: (usernameOrEmail: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  infoMessage: null,
  async login(username, password) {
    set({ isLoading: true, errorMessage: null, infoMessage: null });
    try {
      const user = await AuthService.login(username, password);
      await AsyncStorage.setItem('auth_user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    } catch (e: any) {
      set({ errorMessage: e?.message ?? 'Login failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  async logout() {
    await AsyncStorage.removeItem('auth_user');
    set({ user: null, isAuthenticated: false });
  },
  async hydrate() {
    try {
      const raw = await AsyncStorage.getItem('auth_user');
      if (raw) {
        const user: User = JSON.parse(raw);
        set({ user, isAuthenticated: true });
      }
    } catch {}
  },
  async sendUsernameReminder(email) {
    set({ isLoading: true, errorMessage: null, infoMessage: null });
    try {
      await AuthService.sendUsernameReminder(email);
      set({ infoMessage: 'If an account exists, an email has been sent.' });
    } catch (e: any) {
      set({ errorMessage: e?.message ?? 'Could not send email' });
    } finally {
      set({ isLoading: false });
    }
  },
  async startResetPassword(usernameOrEmail) {
    set({ isLoading: true, errorMessage: null, infoMessage: null });
    try {
      await AuthService.startResetPassword(usernameOrEmail);
      set({ infoMessage: 'If an account exists, a reset link has been sent.' });
    } catch (e: any) {
      set({ errorMessage: e?.message ?? 'Request failed' });
    } finally {
      set({ isLoading: false });
    }
  },
}));

