import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profilo',
  imports: [FormsModule],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent {
  email: string = 'test@mail.com'; 
  password: string = '****'; 

  constructor(private authService: AuthService, private router: Router) {}


  logout() {
  this.authService.logout().subscribe({
    next: () => console.log('Logout effettuato con successo'),
    error: err => console.error('Errore nel logout:', err)
  });
}
}