export enum AuthType {
  Admin = 'admin',
  User = 'user'
}

export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName:string;
    authType: AuthType;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;  // admin or user
}