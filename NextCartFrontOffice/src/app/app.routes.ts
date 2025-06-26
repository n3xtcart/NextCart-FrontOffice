import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { CategoriaProdottoComponent } from './categoria-prodotto/categoria-prodotto.component';
import { LaMiaListaComponent } from './la-mia-lista/la-mia-lista.component';
import { HomeComponent } from './home/home.component';
import { SchermataInizialeComponent } from './schermata-iniziale/schermata-iniziale.component';
import { AuthGuard } from './auth.guard';




export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'profilo', component: ProfiloComponent, canActivate: [AuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: SchermataInizialeComponent }, 
      { path: 'categoria-prodotto', component: CategoriaProdottoComponent },
      { path: 'la-mia-lista', component: LaMiaListaComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];


