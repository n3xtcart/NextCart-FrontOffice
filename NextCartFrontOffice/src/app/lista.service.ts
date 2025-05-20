
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
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
  
  
// da richiedere
  private apiUrl = 'https://api.mockaron.com/mock/bufcwlbupc/la-mia-lista'; 
  private POST = 'https://api.mockaron.com/mock/bufcwlbupc/nuova-lista';
  

  constructor(private http: HttpClient) {
    this.getListe().subscribe(liste => {
      this.liste = liste;
    });
  }

  getListe(): Observable<Lista[]> {
    return this.http.get<Lista[]>(this.apiUrl).pipe(
      tap(listeApi => {
        this.liste = listeApi;
        this.listeSubject.next([...this.liste]);
        this.salva();
      })
    );
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

  /*creaLista(nomeLista: string): void {
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
  }*/
  
    creaLista(nomeLista: string): Observable<Lista> {
      return this.creaListaApi(nomeLista);
    }    

    creaListaApi(nomeLista: string): Observable<Lista> {
      const nuovaLista: Lista = {
        nomeLista: nomeLista,
        dataPrevista: new Date(),
        prodotti: [],
        idLista: 0
      };
    
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'authkey',
          'userid': '1'
        })
      };
    
      return this.http.post<Lista>(this.POST, nuovaLista, options).pipe(
        switchMap(listaCreata => {
          listaCreata.nomeLista = nomeLista;
    
          return this.getListe().pipe(
            tap(() => {
              this.selezionaLista(listaCreata.nomeLista);
              this.salva();
              console.log("Lista creata: " + listaCreata.nomeLista);
            }),
            map(() => listaCreata) 
          );
        })
      );
    }
    
    
  
}
