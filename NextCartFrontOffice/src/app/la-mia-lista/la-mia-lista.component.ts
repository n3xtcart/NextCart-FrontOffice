import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- Import CommonModule
import { ListaSpesaService, Prodotto } from '../servizi/lista-spesa.service';

@Component({
  selector: 'app-la-mia-lista',
  standalone: true,
  imports: [CommonModule],  // <-- Add CommonModule here
  templateUrl: './la-mia-lista.component.html'
})
export class LaMiaListaComponent implements OnInit {
  constructor(private listaService: ListaSpesaService) {}

  listaPerCategoria: { [categoria: string]: Prodotto[] } = {};

  ngOnInit() {
    this.aggiornaVista();
  }

  aggiornaVista() {
    this.listaPerCategoria = this.listaService.getProdottiPerCategoria();
  }

  get totaleProdotti(): number {
    return this.listaService.getTotale();
  }

  get prodottiAcquistati(): number {
    return this.listaService.getAcquistati();
  }

  get progressPercent(): number {
    return this.totaleProdotti > 0
      ? (this.prodottiAcquistati / this.totaleProdotti) * 100
      : 0;
  }

  rimuoviProdotto(categoria: string, prodotto: Prodotto) {
    this.listaService.rimuoviProdotto(prodotto);
    this.aggiornaVista();
  }

  aggiornaCheck(prodotto: Prodotto, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    this.listaService.aggiornaStato(prodotto, checked);
    this.aggiornaVista();
  }
}

