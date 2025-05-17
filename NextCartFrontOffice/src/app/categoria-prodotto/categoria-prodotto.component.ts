import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';
import { Categoria } from '../_models/categoria';
import { ProdottoListaSpesa } from '../_models/prodottoListaSpesa';
import { AggiungiProdottoDialogComponent } from "../aggiungi-prodotto-dialog/aggiungi-prodotto-dialog.component";

@Component({
  selector: 'app-categoria-prodotto',
  imports: [CommonModule, AggiungiProdottoDialogComponent],
  templateUrl: './categoria-prodotto.component.html',
  styleUrl: './categoria-prodotto.component.css'
})
export class CategoriaProdottoComponent implements OnInit {
  categorie: Categoria[] = [];
  categoriaSelezionata: any = null;
  prodottoSelezionato: any = null;


  constructor(private categoriaService: CategoriaService, private listaService: ListaService) {}

  ngOnInit() {
    this.categoriaService.getCategorie().subscribe({
      next: (data) => {
        console.log('Dati ricevuti:', data); 
        this.categorie = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento:', err);
      }
    });
  
    this.categoriaService.categoriaSelezionata$.subscribe({
      next: (categoria) => {
        this.categoriaSelezionata = categoria;
      }
    });
  }
  

  aggiungiAllaLista(prodotto: any) {
    this.prodottoSelezionato = prodotto;
  }
  
  aggiungiProdotto(event: { nomeLista: string, prodotto: any }) {
    this.listaService.aggiungiProdottoALista(event.nomeLista, event.prodotto);
    this.prodottoSelezionato = null;
  }
  


  cliccaCategoria(categoria: any) {
    this.categoriaService.selezionaCategoria(categoria); 
    console.log('Categoria cliccata:', categoria.name);
  }
  
  deselezionaCategoria() {
    this.categoriaSelezionata = null;
  }
  
  
}
