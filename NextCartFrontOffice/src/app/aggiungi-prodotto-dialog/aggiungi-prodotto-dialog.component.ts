import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';  
import { Lista } from '../_models/lista'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  tipologieDisponibili = ['grammi', 'confezione'];
  tipologia: string = 'grammi';
  quantita: number = 1;
  note: string = '';

  listeSpesa: Lista[] = [];
  listaSelezionata: string = '';
  nuovaListaNome: string = '';

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
    const nomeLista =
      this.listaSelezionata === '__new__' ? this.nuovaListaNome : this.listaSelezionata;
  
    if (this.listaSelezionata === '__new__' && this.nuovaListaNome.trim() !== '') {
      this.listaService.creaLista(this.nuovaListaNome.trim())
    }
  
    const prodottoFormattato = {
      nomeProdotto: this.prodotto.nome,
      categoriaProdotto: this.prodotto.categoria.nome,
      tipologiaProdotto: this.tipologia,
      quantitaProdotto: this.quantita,
      noteProdotto: this.note,
      checkedProdotto: false
    };
  
    this.confermaAggiunta.emit({ nomeLista, prodotto: prodottoFormattato });
    console.log("Lista creata: " , nomeLista)
  }



}  
