import { Injectable } from '@angular/core';

export interface Prodotto {
  nome: string;
  quantita: number;
  categoria: string;
  acquistato: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ListaSpesaService {
  private prodotti: Prodotto[] = [];

  aggiungiProdotto(prodotto: Prodotto) {
    this.prodotti.push(prodotto);
  }

  getProdotti(): Prodotto[] {
    return [...this.prodotti]; // copia per evitare modifiche dirette
  }

  rimuoviProdotto(prodotto: Prodotto) {
    this.prodotti = this.prodotti.filter(p => p !== prodotto);
  }

  aggiornaStato(prod: Prodotto, acquistato: boolean) {
    const p = this.prodotti.find(p => p === prod);
    if (p) p.acquistato = acquistato;
  }

  getProdottiPerCategoria(): { [categoria: string]: Prodotto[] } {
    return this.prodotti.reduce((acc, prodotto) => {
      if (!acc[prodotto.categoria]) acc[prodotto.categoria] = [];
      acc[prodotto.categoria].push(prodotto);
      return acc;
    }, {} as { [categoria: string]: Prodotto[] });
  }

  getTotale(): number {
    return this.prodotti.length;
  }

  getAcquistati(): number {
    return this.prodotti.filter(p => p.acquistato).length;
  }
}
