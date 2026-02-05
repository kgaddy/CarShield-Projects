import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AuthType } from '../models/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock users (hardcoded for now)
  private mockUsers: User[] = [
    {
      email: 'admin@test.com',
      password: 'admin123',
      firstName: 'John',
      lastName: 'Admin',
      authType: AuthType.Admin
    },
    {
      email: 'user@test.com',
      password: 'user123',
      firstName: 'John',
      lastName: 'User',
      authType: AuthType.User
    }
  ];

  // Current user state (null means not logged in)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    if (this.isBrowser()) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Login method
  login(email: string, password: string): boolean {
    const user = this.mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Don't store password in localStorage or state
      const userWithoutPassword = { ...user, password: '' };
      this.currentUserSubject.next(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  }

  // Logout method
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  // Get current user value (synchronous)
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.currentUserSubject.value?.authType === AuthType.Admin;
  }
}