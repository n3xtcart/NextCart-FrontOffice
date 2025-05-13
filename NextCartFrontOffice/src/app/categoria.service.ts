import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriaSelezionataSubject = new BehaviorSubject<any>(null);
  categoriaSelezionata$ = this.categoriaSelezionataSubject.asObservable();

  private tutteLeCategorie = [
    {
      nome: 'Frutta',
      img: 'https://placehold.co/150x150/EEE/333?text=Frutta',
      numeroProdotti: 5,
      prodotti: [
        { nome: 'Mela', img: 'https://placehold.co/150x150/EEE/333?text=Mela', quantita: 10 },
        { nome: 'Banana', img: 'https://placehold.co/150x150/EEE/333?text=Banana', quantita: 8 }
      ]
    },
    {
      nome: 'Verdura',
      img: 'https://placehold.co/150x150/EEE/333?text=Verdura',
      numeroProdotti: 3,
      prodotti: [
        { nome: 'Carota', img: 'https://placehold.co/150x150/EEE/333?text=Carota', quantita: 6 }
      ]
    }
  ];

  getCategorie() {
    return this.tutteLeCategorie;
  }

  selezionaCategoria(categoria: any) {
    this.categoriaSelezionataSubject.next(categoria);
  }
}
