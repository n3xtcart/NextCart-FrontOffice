import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private LOGIN = 'http://192.168.10.216:8080/users/login';
  // private LOGOUT = 'https://api.mockaron.com/mock/bufcwlbupc/logout';
  private LOGIN = API_ENDPOINTS.LOGIN;
  private REG = API_ENDPOINTS.REGISTER;
  private AGG = API_ENDPOINTS.UPDATE_USER; 
  private DEL = API_ENDPOINTS.DELETE_USER;
  private REF = API_ENDPOINTS.REFRESH_TOKEN;

  token: { accessToken: string, refreshToken: string }

  constructor(private http: HttpClient, private router: Router) {
    this.token = {
      "accessToken":'',
      "refreshToken":''
    }
   }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.LOGIN, { email, password }).pipe(
    );
  }


/*
login(email: string, password: string): Observable<any> {
  return new Observable(observer => {
    if (email === 'admin' && password === 'admin') {
      const fakeToken = "header." + btoa(JSON.stringify({
        sub: "1234567890",
        name: "John Doe",
        groups: ["admin", "user"],
        iat: Date.now()
      })) + ".signature";

      sessionStorage.setItem('accessToken', fakeToken);
      observer.next({ accessToken: fakeToken });
      observer.complete();
    } else {
      observer.error();
    }
  });
}*/

  logout() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }


  register(nome: string, cognome: string, email: string, password: string): Observable<any> {
    const body = { nome, cognome, email, password };
    return this.http.post<any>(this.REG, body).pipe(
    );
  }

  updateUser(id: string, updatedData: { nome?: string; cognome?: string; email?: string; password?: string }): Observable<any> {
    return this.http.put<any>(this.AGG, updatedData);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.DEL).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      })
    );

  }

  //----------------------------------------
  isTokenExpiringSoon(): boolean {
    const token = sessionStorage.getItem('accessToken');
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return (decoded.exp - now) < 60;
  }


  refreshToken(): Observable<any> {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<any>(this.REF, { refreshToken }).pipe(
      tap(response => {
        if (response && response.accessToken) {
          sessionStorage.setItem('accessToken', response.accessToken);
          if (response.refreshToken) {
            sessionStorage.setItem('refreshToken', response.refreshToken);
          }
        }
      }),
      catchError(err => {

        this.logout();
        this.router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}


