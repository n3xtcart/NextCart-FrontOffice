import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registrazione', component: RegistrazioneComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
