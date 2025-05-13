
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Prodotto {
  nome: string;
  quantita: number;
  acquistato: boolean;
}

export interface Lista {
  nome: string;
  prodotti: Prodotto[];
}

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private readonly STORAGE_KEY = 'listeUtente';
  private liste: Lista[] = [];
  private listaCorrenteSubject = new BehaviorSubject<Lista | null>(null);
  listaCorrente$ = this.listaCorrenteSubject.asObservable();

  constructor() {
    const salvate = localStorage.getItem(this.STORAGE_KEY);
    if (salvate) {
      this.liste = JSON.parse(salvate);
    } else {
      // Dati di default alla prima apertura
      this.liste = [
        {
          nome: 'Lista Spesa',
          prodotti: [
            { nome: 'Pane', quantita: 2, acquistato: false },
            { nome: 'Latte', quantita: 1, acquistato: false }
          ]
        },
        {
          nome: 'Festa',
          prodotti: [
            { nome: 'Patatine', quantita: 3, acquistato: false }
          ]
        }
      ];
      this.salva();
    }

    // Imposta lista corrente alla prima della lista (se esiste)
    if (this.liste.length > 0) {
      this.listaCorrenteSubject.next(this.liste[0]);
    }
  }

  private salva(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.liste));
  }

  getListe(): Lista[] {
    return this.liste;
  }

  getListaCorrente(): Lista | null {
    return this.listaCorrenteSubject.value;
  }

  selezionaLista(nomeLista: string): void {
    const lista = this.liste.find(l => l.nome === nomeLista) || null;
    this.listaCorrenteSubject.next(lista);
  }

  aggiungiProdottoALista(nomeLista: string, prodotto: Prodotto): void {
    const lista = this.liste.find(l => l.nome === nomeLista);
    if (lista) {
      lista.prodotti.push(prodotto);
      this.salva();
      this.listaCorrenteSubject.next({ ...lista }); // notifica aggiornamento
    }
  }

  rimuoviProdotto(nomeLista: string, prodotto: Prodotto): void {
    const lista = this.liste.find(l => l.nome === nomeLista);
    if (lista) {
      lista.prodotti = lista.prodotti.filter(p => p !== prodotto);
      this.salva();
      this.listaCorrenteSubject.next({ ...lista }); // notifica aggiornamento
    }
  }

  creaLista(nome: string): void {
    const nuovaLista: Lista = { nome, prodotti: [] };
    this.liste.push(nuovaLista);
    this.salva();
    this.selezionaLista(nome); // notifica e seleziona
  }
}
