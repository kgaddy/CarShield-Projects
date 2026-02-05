import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // User is logged in, allow access
  } else {
    // User not logged in, redirect to login
    router.navigate(['/login']);
    return false;  // Block access to the route
  }
};