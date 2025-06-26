import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { API_ENDPOINTS } from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

canActivate(): boolean {

  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    this.router.navigate(['/login']);
    return false;
  }

    const payload = this.decodeToken(token);
    if (payload && payload.groups && payload.groups.includes(API_ENDPOINTS.RUOLO_CONCESSO)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      return false;
    }
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }
}

