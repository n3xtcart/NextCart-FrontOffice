import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Lista } from '../_models/lista';
import { ListaService } from '../lista.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-navbar-lat',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar-lat.component.html',
  styleUrls: ['./navbar-lat.component.css']
})
export class NavbarLatComponent implements OnInit {

  dropdownVisible = false;
  tutteLeListe: Lista[] = [];
  listaSelezionata: Lista | null = null;
  nomeNuovaLista: string = '';
  categorie: any[] = [];

  constructor(
    private listaService: ListaService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {

    this.listaService.liste$.subscribe(liste => {
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
    this.listaService.getListe().subscribe();

    this.categoriaService.getCategorie().subscribe(categorie => {
      this.categorie = categorie;
    });
  }

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
  
    this.listaService.creaLista(nome).subscribe(() => {
      this.nomeNuovaLista = '';
    });
  }
  
  

  selezionaLista(lista: Lista) {
    this.listaService.selezionaLista(lista.nomeLista);
  }

  selezionaCategoria(categoria: any) {
    this.categoriaService.selezionaCategoria(categoria);
  }
}
