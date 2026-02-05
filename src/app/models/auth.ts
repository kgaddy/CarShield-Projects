export enum AuthType {
  Admin = 'admin',
  User = 'user'
}

export interface User {
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