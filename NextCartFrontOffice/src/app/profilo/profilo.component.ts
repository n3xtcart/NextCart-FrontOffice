import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profilo',
  imports: [FormsModule,CommonModule],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent {

  email: string = 'test@mail.com'; 
  password: string = '****'; 
  nome: string = 'Mario';
  cognome: string = 'Rossi';
  isEditable: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}


  logout() {
  this.authService.logout();
}
  aggiorna() {
  this.isEditable = true;
  }

  elimina() {
  this.authService.deleteUser('12345').subscribe({
    next: (res) => console.log('Utente eliminato:', res),
    error: (err) => console.error('Errore eliminazione:', err)
  }); 
  }

  salva() {
  this.isEditable = false;

  const userId = '12345'; 

  this.authService.updateUser(userId, {
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



}