import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-modale-aggiungi-prodotto',
  imports: [FormsModule],
  templateUrl: './modale-aggiungi-prodotto.component.html'
})
export class ModaleAggiungiProdottoComponent {
  @Input() nomeProdotto: string = '';
  @Input() categoria: string = '';

  @Output() confermaProdotto = new EventEmitter<any>();

  quantita: number = 1;
  tipologia: string = 'Confezione';
  note: string = '';

  conferma() {
    this.confermaProdotto.emit({
      nome: this.nomeProdotto,
      categoria: this.categoria,
      quantita: this.quantita,
      tipologia: this.tipologia,
      note: this.note
    });

    // Chiudi modale programmaticamente
    const modal = boostrap.Modal.getInstance(document.getElementById('aggiungiProdottoModal')!);
    modal?.hide();
  }
}
