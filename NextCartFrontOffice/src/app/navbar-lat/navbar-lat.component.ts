import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ListaService } from '../lista.service';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { Lista } from '../_models/lista';

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
      this.listaService.getListe().subscribe(liste => {
        this.tutteLeListe = liste;
      });
    
      this.listaService.listaCorrente$.subscribe(lista => {
        this.listaSelezionata = lista;
      });
    
      this.categoriaService.getCategorie().subscribe(categorie => {
        this.categorie = categorie;
      });
    }

    ngOnInit(): void {
      this.categoriaService.getCategorie().subscribe(categorie => {
        this.categorie = categorie;
      });
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
      if (!nome || this.tutteLeListe.find(l => l.nomeLista === nome)) return;
    
      this.listaService.creaLista(nome);
      this.listaService.getListe().subscribe(liste => {
        this.tutteLeListe = liste;
      });
            this.nomeNuovaLista = '';
    }
    
    selezionaLista(lista: Lista) {
      this.listaService.selezionaLista(lista.nomeLista);
    }

    selezionaCategoria(categoria: any) {
      this.categoriaService.selezionaCategoria(categoria);
    }
  
    /*aggiungiAllaLista(prodotto: any) {
      const prodottoFormattato = {
        nome: prodotto.nome,
        quantita: prodotto.quantita,
        acquistato: false
      };
      this.listaService.aggiungiProdottoALista('Lista Spesa', prodottoFormattato);
    }*/
    
}
