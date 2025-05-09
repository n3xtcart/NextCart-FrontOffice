// src/app/servizi/lista.service.ts
import { Injectable } from '@angular/core';

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
  private listaCorrente: Lista | null = null;

  constructor() {
    const salvate = localStorage.getItem(this.STORAGE_KEY);
    if (salvate) {
      this.liste = JSON.parse(salvate);
    } else {
      // Dati di default alla prima apertura
      this.liste = [
        { nome: 'Lista Spesa', prodotti: [
          { nome: 'Pane', quantita: 2, acquistato: false },
          { nome: 'Latte', quantita: 1, acquistato: false }
        ]},
        { nome: 'Festa', prodotti: [
          { nome: 'Patatine', quantita: 3, acquistato: false }
        ]}
      ];
      this.salva();
    }
  }

  private salva(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.liste));
  }

  getListe(): Lista[] {
    return this.liste;
  }

  selezionaLista(nomeLista: string): void {
    this.listaCorrente = this.liste.find(l => l.nome === nomeLista) || null;
  }

  getListaCorrente(): Lista | null {
    return this.listaCorrente;
  }

  aggiungiProdottoALista(nomeLista: string, prodotto: Prodotto): void {
    const lista = this.liste.find(l => l.nome === nomeLista);
    if (lista) {
      lista.prodotti.push(prodotto);
      this.salva();
    }
  }

  rimuoviProdotto(nomeLista: string, prodotto: Prodotto): void {
    const lista = this.liste.find(l => l.nome === nomeLista);
    if (lista) {
      lista.prodotti = lista.prodotti.filter(p => p !== prodotto);
      this.salva();
    }
  }
}
