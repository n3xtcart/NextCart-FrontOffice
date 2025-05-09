import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { CategorieProdottoComponent } from './categorie-prodotto/categorie-prodotto.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registrazione', component: RegistrazioneComponent },
    { path: 'profilo', component: ProfiloComponent },
    {path: 'categorie', component: CategorieProdottoComponent},

    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
