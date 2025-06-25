import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  erroreLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    console.log('Tentativo di login con:', this.email, this.password);
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log(response);


        this.authService.token = response;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);

      },
      error => {
        console.error('Errore nella chiamata API:', error);
        this.erroreLogin = true;
      }
    );
  }



}





