import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';
import { Categoria } from '../_models/categoria';
import { ProdottoListaSpesa } from '../_models/prodottoListaSpesa';
import { AggiungiProdottoDialogComponent } from "../aggiungi-prodotto-dialog/aggiungi-prodotto-dialog.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-categoria-prodotto',
  imports: [CommonModule, AggiungiProdottoDialogComponent, FormsModule],
  templateUrl: './categoria-prodotto.component.html',
  styleUrl: './categoria-prodotto.component.css'
})
export class CategoriaProdottoComponent implements OnInit {
  categorie: Categoria[] = [];
  categoriaSelezionata: any = null;
  prodottoSelezionato: any = null;

  criterioOrdinamento: string = 'nome'; 
  vistaGriglia: boolean = true; 

  constructor(private categoriaService: CategoriaService, private listaService: ListaService) {}

  ngOnInit() {
    this.categoriaService.getCategorie().subscribe({
      next: (data) => {
        this.categorie = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento:', err);
      }
    });

    this.categoriaService.categoriaSelezionata$.subscribe({
      next: (categoria) => {
        this.categoriaSelezionata = categoria;
        this.ordinaProdotti(); 
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
  }

  deselezionaCategoria() {
    this.categoriaSelezionata = null;
  }

  cambiaVista() {
    this.vistaGriglia = !this.vistaGriglia;
  }

  ordinaProdotti() {
    if (!this.categoriaSelezionata) return;

    const prodotti = this.categoriaSelezionata.prodotti;

    if (this.criterioOrdinamento === 'nome') {
      prodotti.sort((a: { nome: string; }, b: { nome: any; }) => a.nome.localeCompare(b.nome));
    } else if (this.criterioOrdinamento === 'quantita') {
      prodotti.sort((a: { quantita: number; }, b: { quantita: number; }) => b.quantita - a.quantita);
    }
  }
}
