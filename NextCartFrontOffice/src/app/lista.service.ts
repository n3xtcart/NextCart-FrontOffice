
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lista } from './_models/lista';
import { ProdottoListaSpesa } from './_models/prodottoListaSpesa';


@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private readonly STORAGE_KEY = 'listeUtente';
  liste: Lista[] = [];
  private listaCorrenteSubject = new BehaviorSubject<Lista | null>(null);
  listaCorrente$ = this.listaCorrenteSubject.asObservable();

  private listeSubject = new BehaviorSubject<Lista[]>([]);
  liste$ = this.listeSubject.asObservable();
  
  

  private apiUrl = 'https://6826ef9b397e48c91317d97b.mockapi.io/lista'; // da richiedere al BackOffice
  
  

  constructor(private http: HttpClient) {
    this.getListe().subscribe(liste => {
      this.liste = liste;
    });
  }

  getListe(): Observable<Lista[]> {
    return new Observable(observer => {
      this.http.get<Lista[]>(this.apiUrl).subscribe(listeApi => {
        this.liste = listeApi;
        this.listeSubject.next(this.liste); // aggiorna i componenti
        observer.next(this.liste);
        observer.complete();
      });
    });
  }
  

  private salva(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.liste));
  }

  selezionaLista(nomeLista: string): void {
    const lista = this.liste.find(l => l.nomeLista === nomeLista) || null;
    this.listaCorrenteSubject.next(lista);
  }

  aggiungiProdottoALista(nomeLista: string, prodotto: ProdottoListaSpesa): void {
    const lista = this.liste.find(l => l.nomeLista === nomeLista);
    if (lista) {
      lista.prodotti.push(prodotto);
      this.salva();
      this.listaCorrenteSubject.next({ ...lista });
    }
  }

  rimuoviProdotto(nomeLista: string, prodotto: ProdottoListaSpesa): void {
    const lista = this.liste.find(l => l.nomeLista === nomeLista);
    if (lista) {
      lista.prodotti = lista.prodotti.filter(p => p !== prodotto);
      this.salva();
      this.listaCorrenteSubject.next({ ...lista }); 
    }
  }

  creaLista(nomeLista: string): void {
    const nuovaLista: Lista = {
      idLista: this.generaIdUnico(),  
      nomeLista: nomeLista,
      dataPrevista: new Date(),      
      prodotti: []
    };
    this.liste.push(nuovaLista);
    this.salva();
    this.selezionaLista(nomeLista);
    this.listeSubject.next([...this.liste]); 
  }
  

  generaIdUnico(): number {
    return this.liste.length > 0 ? Math.max(...this.liste.map(l => l.idLista)) + 1 : 1;
  }
  
  
  
}
