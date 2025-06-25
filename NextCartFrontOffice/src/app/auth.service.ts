import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN = 'http://192.168.10.216:8080/users/login';
  // private LOGOUT = 'https://api.mockaron.com/mock/bufcwlbupc/logout';
  private REG = 'http://192.168.10.216:8080/users/register';
  private AGG = 'http://192.168.10.216:8080/users'; // PUT
  private DEL = 'http://192.168.10.216:8080/users';

  token: { accessToken: string, refreshToken: string }

  constructor(private http: HttpClient, private router: Router) {
    this.token = {
      "accessToken":'',
      "refreshToken":''
    }
   }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.LOGIN, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
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


