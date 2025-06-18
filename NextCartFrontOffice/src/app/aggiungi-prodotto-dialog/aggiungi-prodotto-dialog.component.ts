import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';  
import { Lista } from '../_models/lista'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdottoListaSpesa } from '../_models/prodottoListaSpesa';

@Component({
  selector: 'app-aggiungi-prodotto-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './aggiungi-prodotto-dialog.component.html',
  styleUrls: ['./aggiungi-prodotto-dialog.component.css']
})


export class AggiungiProdottoDialogComponent implements OnInit {
  @Input() prodotto: any;
  @Output() chiudi = new EventEmitter<void>();
  @Output() confermaAggiunta = new EventEmitter<any>();

  quantita: number = 1;
  note: string = '';

  listeSpesa: Lista[] = [];
  listaSelezionata: string = '';
  nuovaListaNome: string = '';
  nuovaListaData: string = '';

  constructor(private listaService: ListaService) {}

  ngOnInit() {
    this.listaService.getListe().subscribe((liste) => {
      this.listeSpesa = liste;
      this.listaSelezionata = liste.length ? liste[0].nomeLista : '';
    });
  }

  annulla() {
    this.chiudi.emit();
  }


  conferma() {
    const nomeLista = this.listaSelezionata === '__new__' ? this.nuovaListaNome.trim() : this.listaSelezionata;

    const prodottoFormattato: ProdottoListaSpesa = {
      idProdottoShop: this.prodotto.id,                
      idProdottoLista: 0,                              
      nomeProdotto: this.prodotto.nome,
      categoriaProdotto: this.prodotto.categoria.nome,
      quantitaProdotto: this.quantita,
      noteProdotto: this.note,
      checkedProdotto: false
    };

    const aggiungiProdottoEFaiEmit = (idLista: number) => {
      this.listaService.aggiungiProdottoALista(idLista, prodottoFormattato).subscribe(() => {
        this.confermaAggiunta.emit({ nomeLista, prodotto: prodottoFormattato });
      });
    };
    if (this.listaSelezionata === '__new__' && nomeLista !== '' && this.nuovaListaData !== '') {
      this.listaService.creaLista(nomeLista, this.nuovaListaData).subscribe((nuovaLista) => {
        this.listeSpesa.push(nuovaLista.listeSpesa[0]);
        aggiungiProdottoEFaiEmit(nuovaLista.listeSpesa[0].idLista);
      });
    } else if (nomeLista !== '') {
      const lista = this.listeSpesa.find(l => l.nomeLista === nomeLista);
      if (lista?.idLista) {
        aggiungiProdottoEFaiEmit(lista.idLista);
      }
    }
  }


}  
