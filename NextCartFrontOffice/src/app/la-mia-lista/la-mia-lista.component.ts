import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Prodotto {
  nome: string;
  quantita: number;
  acquistato: boolean;
}

@Component({
  selector: 'app-la-mia-lista',
  templateUrl: './la-mia-lista.component.html',
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrls: ['./la-mia-lista.component.css']
})
export class LaMiaListaComponent {
  dropdownVisible = false;
  listaSelezionata: { nome: string; prodotti: Prodotto[] } | null = null;

  liste = [
    { nome: 'Lista Spesa', prodotti: [
      { nome: 'Pane', quantita: 2, acquistato: false },
      { nome: 'Latte', quantita: 1, acquistato: false }
    ]},
    { nome: 'Festa', prodotti: [
      { nome: 'Patatine', quantita: 3, acquistato: false }
    ]}
  ];

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selezionaLista(lista: any) {
    this.listaSelezionata = lista;
  }

  rimuoviProdotto(prodotto: Prodotto) {
    // Ora TypeScript sa che la lista è un array di prodotti
    this.listaSelezionata!.prodotti = this.listaSelezionata!.prodotti.filter((p: Prodotto) => p !== prodotto);
  }
}
