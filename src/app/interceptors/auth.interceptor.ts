import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  console.log('Interceptor ran');
  console.log('Request URL:', req.url);
  console.log('Token:', token);

  //Attach token only if user is logged in
  if(token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Authorization header added');
  }

  return next(req).pipe(
    catchError((error) => {
      //If token is invalid, log out and redirect
      if(error.status == 401){
        authService.logout();
        router.navigate(['/admin-login']);
      }

      return throwError(() => error);
    })
  )
};
