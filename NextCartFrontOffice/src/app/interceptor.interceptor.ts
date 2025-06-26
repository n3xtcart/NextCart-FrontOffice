import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { switchMap, catchError, of, throwError } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = sessionStorage.getItem('accessToken');

  if (!accessToken) {
    return next(req);
  }

  if (authService.isTokenExpiringSoon()) {
 
    return authService.refreshToken().pipe(
      switchMap(() => {
        const newToken = sessionStorage.getItem('accessToken');
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`
          }
        });
        return next(clonedReq);
      }),
      catchError(err => {
        
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(clonedReq);
  }
};