import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo',
  imports: [FormsModule],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent {
  email: string = 'utente@example.com'; // Valore predefinito
  password: string = '********'; // Valore predefinito

  constructor(private router: Router) {}

  logout() {
    // Logica per il logout, come rimuovere il token, reindirizzare, ecc.
    this.router.navigate(['/login']);
    
  }
}