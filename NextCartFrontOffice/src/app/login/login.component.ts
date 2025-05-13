import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  accedi() {
    this.router.navigate(['/home']);
  }
  
  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // logica per inviare i dati al backend quando sarà pronto
  }
}




