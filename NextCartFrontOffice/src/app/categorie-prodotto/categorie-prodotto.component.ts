import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaleAggiungiProdottoComponent } from '../componenti/modale-aggiungi-prodotto/modale-aggiungi-prodotto.component';
import { CategorieService } from '../servizi/categorie.service';  // Importa il servizio

@Component({
  selector: 'app-categorie-prodotto',
  standalone: true,
  imports: [CommonModule, ModaleAggiungiProdottoComponent],
  templateUrl: './categorie-prodotto.component.html',
  styleUrls: ['./categorie-prodotto.component.css']
})
export class CategorieProdottoComponent implements OnInit {
  prodottoSelezionato = { nome: '', categoria: '' };
  categorie: any[] = [];  // Dichiarazione dell'array per le categorie


  constructor(private categorieService: CategorieService) {}  // Inietti il servizio nel costruttore

  ngOnInit() {
    // Chiamata al servizio per ottenere i dati delle categorie
    this.categorieService.getCategorie().subscribe(data => {
      this.categorie = data;  // Salva i dati nella proprietà categorie
    });
  }

  bootstrap: any; // <-- Dichiara bootstrap per evitare errori TypeScript

  apriModale(nome: string, categoria: string) {
    this.prodottoSelezionato = { nome, categoria };
    const modalElement = document.getElementById('aggiungiProdottoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  aggiungiAllaLista(prodotto: any) {
    console.log('Prodotto aggiunto:', prodotto);
  }
}


