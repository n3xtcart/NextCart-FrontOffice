
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
  private GET = 'https://api.mockaron.com/mock/bufcwlbupc/la-mia-lista'; 
  private POST = 'https://api.mockaron.com/mock/bufcwlbupc/nuova-lista';
  private DELETE = 'https://api.mockaron.com/mock/bufcwlbupc/la-mia-lista';
  

  constructor(private http: HttpClient) {
    this.getListe().subscribe(liste => {
      this.liste = liste;
    });
  }

  getListe(): Observable<Lista[]> {
    return this.http.get<Lista[]>(this.GET).pipe(
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

  rimuoviProdottoApi(idLista: number, idProdottoLista: number): Observable<any> {
    const url = `${this.GET}/${idLista}/prodotti/${idProdottoLista}`;
    return this.http.delete(url).pipe(
      tap(() => {
        const lista = this.liste.find(l => l.idLista === idLista);
        if (lista) {
          lista.prodotti = lista.prodotti.filter(p => p.idProdottoLista !== idProdottoLista);
          this.listaCorrenteSubject.next({ ...lista });
          this.salva();
        }
      })
    );
  }

  
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
    
    eliminaListaApi(idLista: number): Observable<any> {
    return this.http.delete(`${this.DELETE}/${idLista}`).pipe(
      tap(() => {
        this.liste = this.liste.filter(lista => lista.idLista !== idLista);
        this.listeSubject.next([...this.liste]);
        this.salva();

        const listaSelezionata = this.listaCorrenteSubject.value;
        if (listaSelezionata && listaSelezionata.idLista === idLista) {
          this.listaCorrenteSubject.next(null);
        }

        console.log(`Lista con id ${idLista} eliminata`);
      })
    );
  }

  
}
