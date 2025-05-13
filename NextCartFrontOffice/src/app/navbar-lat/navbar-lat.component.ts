import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ListaService, Lista, Prodotto } from '../lista.service';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-navbar-lat',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar-lat.component.html',
  styleUrl: './navbar-lat.component.css'
})
export class NavbarLatComponent {

    dropdownVisible = false;
    tutteLeListe: Lista[] = [];
    listaSelezionata: Lista | null = null;
    nomeNuovaLista: string = '';
  
    constructor(private listaService: ListaService, private router: Router, private categoriaService: CategoriaService) {
      this.tutteLeListe = this.listaService.getListe();
      this.listaSelezionata = this.listaService.getListaCorrente();
      this.categorie = this.categoriaService.getCategorie();
    }

    categorie: any[] = [];


    isListaPage(): boolean {
      return this.router.url.includes('/home/la-mia-lista');
    }

    isCatPage(): boolean {
      return this.router.url.includes('/home/categoria-prodotto');
    }
  
  
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    }
  
    creaNuovaLista() {
      const nome = this.nomeNuovaLista.trim();
      if (!nome || this.tutteLeListe.find(l => l.nome === nome)) return;
    
      this.listaService.creaLista(nome);
      this.tutteLeListe = this.listaService.getListe(); 
      this.nomeNuovaLista = '';
    }
    
    selezionaLista(lista: Lista) {
      this.listaService.selezionaLista(lista.nome);
    }

    selezionaCategoria(categoria: any) {
      this.categoriaService.selezionaCategoria(categoria);
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
