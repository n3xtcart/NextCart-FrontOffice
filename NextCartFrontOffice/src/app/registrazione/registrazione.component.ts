import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrazione',
  imports: [FormsModule],
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css'
})
export class RegistrazioneComponent {

  nome: string = '';
  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit() {
    console.log('Nome:', this.nome);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // logica per inviare i dati al backend quando sarà pronto
  }
}
