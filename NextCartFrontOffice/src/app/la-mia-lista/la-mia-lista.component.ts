import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Lista } from '../_models/lista';
import { ProdottoListaSpesa } from '../_models/prodottoListaSpesa';

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
      if (lista) {
        this.listaSelezionata = lista;
        console.log('Lista selezionata aggiornata:', lista);
      }
    });
  
    this.listaService.getListe().subscribe({
      next: (data) => {
        if (data.length > 0 && !this.listaSelezionata) {
          this.listaSelezionata = data[0];
          this.listaService.selezionaLista(data[0].nomeLista);
        }
      },
      error: (err) => {
        console.error('Errore nel caricamento delle liste:', err);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

rimuoviProdotto(prodotto: ProdottoListaSpesa) {
  if (this.listaSelezionata) {
    const conferma = confirm(`Vuoi rimuovere "${prodotto.nomeProdotto}" dalla lista?`);
    if (conferma) {
      this.listaService.rimuoviProdottoApi(this.listaSelezionata.idLista, prodotto.idProdottoLista).subscribe({
        next: () => console.log('Prodotto rimosso'),
        error: err => console.error('Errore nella rimozione del prodotto:', err)
      });
    }
  }
}


  eliminaLista() {
    if (this.listaSelezionata) {
      const conferma = confirm(`Vuoi davvero eliminare la lista "${this.listaSelezionata.nomeLista}"?`);
      if (conferma) {
        this.listaService.eliminaListaApi(this.listaSelezionata.idLista).subscribe({
          next: () => {
            this.listaSelezionata = null;
            console.log('Lista eliminata con successo');
          },
          error: (err) => {
            console.error('Errore durante l\'eliminazione della lista:', err);
          }
        });
      }
    }
  }

  
}



