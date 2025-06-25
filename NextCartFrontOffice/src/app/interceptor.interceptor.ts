import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const service = inject(AuthService);
  const token = service.token;

  console.log(token);

  if (token.accessToken !== '' && token.refreshToken !== '') {
    let modifiedRequest = req.clone({ setHeaders: { "Authorization": `Bearer ${token}` } })
    console.log(modifiedRequest);
    return next(modifiedRequest);
  }

  return next(req);
};
