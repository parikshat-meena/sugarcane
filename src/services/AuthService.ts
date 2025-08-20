import axios from 'axios';

type LoginResponse = { id: string; username: string };

export const AuthService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    await new Promise<void>(r => setTimeout(() => r(), 400));
    if (username && password) {
      return { id: '1', username };
    }
    throw new Error('Invalid credentials');
  },

  async sendUsernameReminder(email: string): Promise<void> {
    await new Promise<void>(r => setTimeout(() => r(), 400));
  },

  async startResetPassword(usernameOrEmail: string): Promise<void> {
    await new Promise<void>(r => setTimeout(() => r(), 400));
  },
};

