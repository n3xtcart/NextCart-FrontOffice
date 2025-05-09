import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  // Importa Observable per restituire dati in modo asincrono

@Injectable({
  providedIn: 'root',  // Questo fa in modo che il servizio sia disponibile globalmente
})
export class CategorieService {

  // Metodo che restituisce una lista di categorie (dati fittizi per esempio)
  getCategorie(): Observable<any[]> {
    const categorie = [
      { nome: 'Frutta & Verdura', immagine: 'assets/img/frutta.jpg', numeroProdotti: 4 },
      { nome: 'Carne', immagine: 'assets/img/carne.jpg', numeroProdotti: 2 },
      { nome: 'Pesce', immagine: 'assets/img/pesce.jpg', numeroProdotti: 3 },
      { nome: 'Salumi & Formaggi', immagine: 'assets/img/salumi.jpg', numeroProdotti: 5 }
    ];
    return of(categorie);  // Restituisce un Observable con i dati delle categorie
  }
}
