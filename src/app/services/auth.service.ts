import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AuthType, LoginResponse, LoginRequest } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Current user state (null means not logged in)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
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

  private mapApiUserToUser(apiUser: LoginResponse): User {
    return {
      id: apiUser.id,
      email: apiUser.email,
      password: apiUser.password,
      firstName: apiUser.firstName,
      lastName: apiUser.lastName,
      authType: apiUser.role === 'admin' ? AuthType.Admin : AuthType.User
    };
  }

  // Login method

  login(email: string, password: string): Observable<User> {
    const url = `/api/Project/Login`;
    const body: LoginRequest = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(apiResponse => this.mapApiUserToUser(apiResponse)),
      tap(user => {
        // Don't store password in localStorage or state
        const userWithoutPassword = { ...user, password: '' };
        this.currentUserSubject.next(userWithoutPassword);
        if (this.isBrowser()) {
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        }
      })
    );
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
    var isAuth = this.currentUserSubject.value?.authType === AuthType.Admin;
    return isAuth;
  }

}
