import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profilo',
  imports: [FormsModule, CommonModule],
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  email: string = ''; 
  password: string = ''; 
  nome: string = '';
  cognome: string = '';
  isEditable: boolean = false;
  userId: string | number = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('accessToken');
      if (token) {
        const userData = this.decodeToken(token);
      if (userData) {
        this.userId = userData.user?.id || userData.id || '';
        this.email = userData.user?.email || userData.email || '';
        this.nome = userData.user?.nome || userData.nome || '';
        this.cognome = userData.user?.cognome || userData.cognome || '';
        this.password = userData.user?.password || userData.password || '';
      }
    }
  }

private decodeToken(token: string): any {
  try {
    const payload = token.split('.')[1];
    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    const data = JSON.parse(atob(base64));

    if (typeof data.user === 'string') {
      data.user = JSON.parse(data.user);
    }

    return data;
  } catch (e) {
    console.error('Errore nel decode del token', e);
    return null;
  }
}

  logout() {
      this.authService.logout();
  }

  aggiorna() {
    this.isEditable = true;
  }

  elimina() {
    if (!this.userId) return;

    this.authService.deleteUser(this.userId.toString()).subscribe({
      next: (res) => console.log('Utente eliminato:', res),
      error: (err) => console.error('Errore eliminazione:', err)
    });
  }

  salva() {
    if (!this.userId) return;

    this.isEditable = false;

    this.authService.updateUser(this.userId.toString(), {
      nome: this.nome,
      cognome: this.cognome,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Profilo aggiornato con successo', response);
        alert('Profilo aggiornato!');
      },
      error: (error) => {
        console.error('Errore aggiornando il profilo:', error);
        alert('Errore durante l\'aggiornamento. Riprova.');
      }
    });
  }

  tornaIndietro() {
    this.router.navigate(['/home']); 
  }
}
