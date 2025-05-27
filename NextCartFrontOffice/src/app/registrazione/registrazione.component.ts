import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  imports: [FormsModule],
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css'
})
export class RegistrazioneComponent {

  nome: string = '';
  cognome: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
  this.authService.register(this.nome, this.cognome, this.email, this.password)
    .subscribe({
      next: (response) => {
        console.log('Registrazione avvenuta con successo:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Errore nella registrazione:', error);
        
        if (error.status === 409) {
          alert('Email già registrata. Usa un’altra email o effettua il login.');
        } else {
          alert('Errore nella registrazione. Riprova più tardi.');
        }
      }
    });
}

}
