import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { CategoriaProdottoComponent } from './categoria-prodotto/categoria-prodotto.component';
import { LaMiaListaComponent } from './la-mia-lista/la-mia-lista.component';




export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registrazione', component: RegistrazioneComponent },
    { path: 'profilo', component: ProfiloComponent },
    { path: 'categoria-prodotto', component: CategoriaProdottoComponent },
    { path: 'la-mia-lista', component: LaMiaListaComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' }
];



