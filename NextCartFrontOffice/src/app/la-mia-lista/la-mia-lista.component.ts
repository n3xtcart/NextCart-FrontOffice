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
  listeSpesa: Lista[] = [];

  constructor(private listaService: ListaService) {}

  ngOnInit() {

    this.listaService.getListe().subscribe(liste => {
    this.listeSpesa = liste;
    if (liste.length > 0) {
      this.listaSelezionata = liste[0];
      this.listaService.selezionaLista(liste[0].nomeLista);
    }
  });

    this.subscription = this.listaService.listaCorrente$.subscribe(lista => {
      
      if (lista) {
        this.listaSelezionata = lista;
      console.log('Lista selezionata aggiornata:', this.listaSelezionata);
          console.log(this.listaSelezionata.prodotti);
          
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

aggiornaProdotto(prodotto: ProdottoListaSpesa) {
  if (prodotto.idProdottoLista != null) {
    
    const maxQuantita = prodotto.quantitaProdotto ?? 0;
    if (prodotto.quantitaProdotto > maxQuantita) {
      alert(`Quantità massima disponibile per questo prodotto è ${maxQuantita}.`);
      return; 
    }

    const payload = {
      idProdottoShop: prodotto.idProdottoShop,
      quantitaProdotto: prodotto.quantitaProdotto,
      //noteProdotto: prodotto.noteProdotto,
      noteProdotto: prodotto.noteProdotto?.trim() === '' ? undefined : prodotto.noteProdotto?.trim(),
      checkedProdotto: prodotto.checkedProdotto
    };

    this.listaService.aggiornaProdottoApi(prodotto.idProdottoLista, payload).subscribe({
      next: () => console.log(`Prodotto ${prodotto.nomeProdotto} aggiornato`),
      error: err => console.error('Errore aggiornamento prodotto:', err)
    });
  }
}


  rimuoviProdotto(prodotto: ProdottoListaSpesa) {
    if (this.listaSelezionata) {
      const conferma = confirm(`Vuoi rimuovere "${prodotto.nomeProdotto}" dalla lista?`);
      if (conferma) {
        if (prodotto.idProdottoLista != null) {
          this.listaService.rimuoviProdottoApi(this.listaSelezionata.idLista, prodotto.idProdottoLista).subscribe({
            next: () => console.log('Prodotto rimosso'),
            error: err => console.error('Errore nella rimozione del prodotto:', err)
          });
        } else {
          console.warn('Impossibile rimuovere il prodotto: idProdottoLista non è definito');
        }
      }
    }
  }


eliminaLista() {
  if (this.listaSelezionata) {
    const conferma = confirm(`Vuoi davvero eliminare la lista "${this.listaSelezionata.nomeLista}"?`);
    if (conferma) {
      const idDaEliminare = this.listaSelezionata.idLista;
      this.listaService.eliminaListaApi(idDaEliminare).subscribe({
        next: () => {
    
          this.listeSpesa = this.listeSpesa.filter(lista => lista.idLista !== idDaEliminare);

          if (this.listeSpesa.length > 0) {
            this.listaSelezionata = this.listeSpesa[0];
            this.listaService.selezionaLista(this.listaSelezionata.nomeLista);
          } else {
            this.listaSelezionata = null;
            this.listaService.selezionaLista("");
          }

          console.log('Lista eliminata con successo');
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione della lista:', err);
        }
      });
    }
  }
}

onListaChange(lista: Lista | null) {
  if (lista) {
    this.listaSelezionata = lista;
    this.listaService.selezionaLista(lista.nomeLista);
  } else {
    this.listaSelezionata = null;
  }
}
  
}



