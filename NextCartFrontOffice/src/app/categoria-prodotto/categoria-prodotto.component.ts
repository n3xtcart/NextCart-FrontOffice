import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria-prodotto',
  imports: [CommonModule],
  templateUrl: './categoria-prodotto.component.html',
  styleUrl: './categoria-prodotto.component.css'
})
export class CategoriaProdottoComponent implements OnInit {
  categorie: any[] = [];
  categoriaSelezionata: any = null;

  constructor(
    private categoriaService: CategoriaService,
    private listaService: ListaService
  ) {}

  ngOnInit() {
    this.categorie = this.categoriaService.getCategorie();
    this.categoriaService.categoriaSelezionata$.subscribe(categoria => {
      this.categoriaSelezionata = categoria;
    });
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
