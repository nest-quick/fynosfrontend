import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Allow only logged in admins
  if(authService.isLoggedIn() && authService.isAdmin()){
    return true;
  }

  // Redirect user if not authorized
  return router.createUrlTree(['/admin-login']);
};
