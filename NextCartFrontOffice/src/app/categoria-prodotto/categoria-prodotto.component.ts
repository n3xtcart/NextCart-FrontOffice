import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categoria-prodotto',
  templateUrl: './categoria-prodotto.component.html',
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrls: ['./categoria-prodotto.component.css']
})
export class CategoriaProdottoComponent {
  dropdownVisible = false;
  categoriaSelezionata: any = null;

  categorie = [
    { nome: 'Frutta', img: 'assets/frutta.jpg', numeroProdotti: 5, prodotti: [
      { nome: 'Mela', img: 'assets/mela.jpg', quantita: 10 },
      { nome: 'Banana', img: 'assets/banana.jpg', quantita: 8 }
    ]},
    { nome: 'Verdura', img: 'assets/verdura.jpg', numeroProdotti: 3, prodotti: [
      { nome: 'Carota', img: 'assets/carota.jpg', quantita: 6 }
    ]}
  ];

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selezionaCategoria(categoria: any) {
    this.categoriaSelezionata = categoria;
  }

  aggiungiAllaLista(prodotto: any) {
    // Logica per aggiungere alla lista (può usare un servizio)
    console.log('Aggiunto:', prodotto);
  }
}
