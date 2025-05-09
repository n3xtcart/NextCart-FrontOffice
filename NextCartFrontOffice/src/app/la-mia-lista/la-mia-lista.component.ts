import { Component } from '@angular/core';
import { ListaService, Lista, Prodotto } from '../lista.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-la-mia-lista',
  templateUrl: './la-mia-lista.component.html',
  imports: [ 
    CommonModule, FormsModule
  ],
  styleUrls: ['./la-mia-lista.component.css']
})
export class LaMiaListaComponent {
  dropdownVisible = false;
  tutteLeListe: Lista[] = [];
  listaSelezionata: Lista | null = null;
  nomeNuovaLista: string = '';

  constructor(private listaService: ListaService) {
    this.tutteLeListe = this.listaService.getListe();
    this.listaSelezionata = this.listaService.getListaCorrente();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selezionaLista(lista: Lista) {
    this.listaService.selezionaLista(lista.nome);
    this.listaSelezionata = this.listaService.getListaCorrente();
  }

  rimuoviProdotto(prodotto: Prodotto) {
    if (!this.listaSelezionata) return;
    this.listaService.rimuoviProdotto(this.listaSelezionata.nome, prodotto);
    // ricarica la lista aggiornata
    this.listaSelezionata = this.listaService.getListaCorrente();
  }

  creaNuovaLista() {
    const nome = this.nomeNuovaLista.trim();
    if (!nome || this.tutteLeListe.find(l => l.nome === nome)) return;

    const nuovaLista: Lista = { nome, prodotti: [] };
    this.tutteLeListe.push(nuovaLista);
    this.listaService.selezionaLista(nuovaLista.nome);
    this.salvaListe();

    this.listaSelezionata = this.listaService.getListaCorrente();
    this.nomeNuovaLista = '';
  }

  // metodo per forzare il salvataggio
  private salvaListe() {
    localStorage.setItem('listeUtente', JSON.stringify(this.tutteLeListe));
  }
}


