import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';
import { Categoria } from '../_models/categoria';
import { ProdottoListaSpesa } from '../_models/prodottoListaSpesa';

@Component({
  selector: 'app-categoria-prodotto',
  imports: [CommonModule],
  templateUrl: './categoria-prodotto.component.html',
  styleUrl: './categoria-prodotto.component.css'
})
export class CategoriaProdottoComponent implements OnInit {
  categorie: Categoria[] = [];
  categoriaSelezionata: any = null;

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
  

  aggiungiAllaLista(prodotto: ProdottoListaSpesa) {
    const prodottoFormattato = {
      idProdottoLista: prodotto.idProdottoLista,
      nomeProdotto: prodotto.nomeProdotto,
      categoriaProdotto: prodotto.categoriaProdotto,
      tipologiaProdotto: prodotto.tipologiaProdotto,
      quantitaProdotto: prodotto.quantitaProdotto,
      noteProdotto: prodotto.noteProdotto,
      checkedProdotto: prodotto.checkedProdotto
    };
    this.listaService.aggiungiProdottoALista('Lista Spesa', prodottoFormattato);
  }

  cliccaCategoria(categoria: any) {
    this.categoriaService.selezionaCategoria(categoria); 
    console.log('Categoria cliccata:', categoria.name);
  }
  
  deselezionaCategoria() {
    this.categoriaSelezionata = null;
  }
  
  
}
