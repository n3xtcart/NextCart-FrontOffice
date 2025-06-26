import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';
import { Categoria } from '../_models/categoria';
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
    next: data => this.categorie = data,
    error: err => console.error(err)
  });

  this.categoriaService.categoriaSelezionata$.subscribe({
    next: categoria => {
      this.categoriaSelezionata = categoria;
      if (categoria && categoria.id) {
        this.categoriaService.getProdottiPerCategoria(categoria.id).subscribe({
          next: prodotti => {
            this.categoriaSelezionata.prodotti = prodotti;
            this.ordinaProdotti();
          },
          error: err => {
            console.error(err);
            this.categoriaSelezionata.prodotti = [];
          }
        });
      } else {
        this.categoriaSelezionata.prodotti = [];
      }
    }
  });
}

  aggiungiAllaLista(prodotto: any) {
    this.prodottoSelezionato = prodotto;
  }

  aggiungiProdotto(event: { idLista: number, nomeLista: string, prodotto: any }) {
    this.listaService.aggiungiProdottoALista(event.idLista, event.prodotto);
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
