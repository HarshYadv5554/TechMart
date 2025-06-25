import { User } from '../types';

const STORAGE_KEY = 'techmart_user';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {
    this.loadUserFromStorage();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadUserFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would validate against backend
    if (email && password.length >= 6) {
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        lastName: 'User',
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg`
      };

      this.currentUser = user;
      this.saveUserToStorage(user);
      return user;
    }

    throw new Error('Invalid credentials');
  }

  async register(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock registration - in real app, this would create user in backend
    if (email && password.length >= 6 && firstName && lastName) {
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        firstName,
        lastName,
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg`
      };

      this.currentUser = user;
      this.saveUserToStorage(user);
      return user;
    }

    throw new Error('Invalid registration data');
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}