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
  private REG = 'https://api.mockaron.com/mock/bufcwlbupc/register';
  private AGG = 'https://api.mockaron.com/mock/bufcwlbupc/users/:id';
  private DEL = 'https://api.mockaron.com/mock/bufcwlbupc/users/:id';


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

  register(nome: string, cognome: string, email: string, password: string): Observable<any> {
    const body = { nome, cognome, email, password };
    return this.http.post<any>(this.REG, body);
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


}


