import { User } from '../types';

class AuthService {
  private storageKey = 'moviehub_user';

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'demo@moviehub.com' && password === 'demo123') {
      const user: User = {
        id: '1',
        name: 'Demo User',
        email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        watchlist: [550, 680, 155],
        ratings: { 550: 5, 680: 4, 155: 4 },
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      return user;
    }
    
    throw new Error('Invalid credentials');
  }

  async register(name: string, email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      watchlist: [],
      ratings: {},
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    return user;
  }

  async getCurrentUser(): Promise<User | null> {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  updateUser(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }
}

export const authService = new AuthService();