// categoria-prodotto.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaService } from '../lista.service'; // <-- importa il servizio

@Component({
  selector: 'app-categoria-prodotto',
  templateUrl: './categoria-prodotto.component.html',
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrls: ['./categoria-prodotto.component.css'],
  standalone: true
})
export class CategoriaProdottoComponent {
  dropdownVisible = false;
  categoriaSelezionata: any = null;

  categorie = [
    {
      nome: 'Frutta',
      img: 'assets/frutta.jpg',
      numeroProdotti: 5,
      prodotti: [
        { nome: 'Mela', img: 'assets/mela.jpg', quantita: 10 },
        { nome: 'Banana', img: 'assets/banana.jpg', quantita: 8 }
      ]
    },
    {
      nome: 'Verdura',
      img: 'assets/verdura.jpg',
      numeroProdotti: 3,
      prodotti: [
        { nome: 'Carota', img: 'assets/carota.jpg', quantita: 6 }
      ]
    }
  ];

  constructor(private listaService: ListaService) {}

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selezionaCategoria(categoria: any) {
    this.categoriaSelezionata = categoria;
  }

  aggiungiAllaLista(prodotto: any) {
    const prodottoFormattato = {
      nome: prodotto.nome,
      quantita: prodotto.quantita,
      acquistato: false
    };
    this.listaService.aggiungiProdottoALista('Lista Spesa', prodottoFormattato);
  }
}

