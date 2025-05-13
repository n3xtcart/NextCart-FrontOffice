import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaService, Lista, Prodotto } from '../lista.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-la-mia-lista',
  templateUrl: './la-mia-lista.component.html',
  imports: [ 
    CommonModule, FormsModule
  ],
  styleUrls: ['./la-mia-lista.component.css']
})
export class LaMiaListaComponent implements OnInit, OnDestroy {
  listaSelezionata: Lista | null = null;
  private subscription!: Subscription;

  constructor(private listaService: ListaService) {}

  ngOnInit() {
    this.subscription = this.listaService.listaCorrente$.subscribe(lista => {
      this.listaSelezionata = lista;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  rimuoviProdotto(prodotto: Prodotto) {
    if (this.listaSelezionata) {
      this.listaService.rimuoviProdotto(this.listaSelezionata.nome, prodotto);
    }
  }
}



