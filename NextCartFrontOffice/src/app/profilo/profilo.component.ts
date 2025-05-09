import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profilo',
  imports: [FormsModule],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent {
  email: string = 'utente@example.com'; // Valore predefinito
  password: string = '********'; // Valore predefinito

  logout() {
    // Logica per il logout, come rimuovere il token, reindirizzare, ecc.
    console.log('Logout eseguito');
  }
}