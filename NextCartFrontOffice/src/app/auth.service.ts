import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN = 'https://api.mockaron.com/mock/bufcwlbupc/login'; 
  private LOGOUT = 'https://api.mockaron.com/mock/bufcwlbupc/logout';


  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.LOGIN, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.LOGOUT, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
    );
  }

}


