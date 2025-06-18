
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
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
  
  
  private GET = 'http://localhost:8080/liste-spesa/utente'; 
  private POST = 'http://localhost:8080/liste-spesa';
  private DELETE = 'http://localhost:8080/liste-spesa/';
  

  constructor(private http: HttpClient) {
    this.getListe().subscribe(liste => {
      this.liste = liste;
    });
  }

  getListe(): Observable<Lista[]> {

    return this.http.get<{ listeSpesa: Lista[] }>(this.GET).pipe(
      map(response => response.listeSpesa),
      switchMap(liste => {
        const listeConProdotti$ = liste.map(lista =>{
          console.log(lista);
          
    return this.http.get<Lista>(`http://localhost:8080/liste-spesa/${lista.idLista}`)

        }
        );
        return forkJoin(listeConProdotti$);
      }),
      tap(listeComplete => {
        this.liste = listeComplete;
        this.listeSubject.next([...this.liste]);
      })
    );
  }

  selezionaLista(nomeLista: string): void {
    const lista = this.liste.find(l => l.nomeLista === nomeLista) || null;
    this.listaCorrenteSubject.next(lista);
  }

  aggiungiProdottoALista(idLista: number, prodotto: ProdottoListaSpesa): Observable<any> {
    const body = {
      idProdottoShop: prodotto.idProdottoShop,
      quantitaProdotto: prodotto.quantitaProdotto,
      noteProdotto: prodotto.noteProdotto,
      checkedProdotto: prodotto.checkedProdotto
    };

    return this.http.post(`http://localhost:8080/liste/${idLista}/prodotti`, body);
  }

  aggiornaProdottoApi(idProdottoLista: number, prodotto: ProdottoListaSpesa): Observable<any> {
  const url = `http://localhost:8080/liste/prodotti/${idProdottoLista}`;
  const body = {
    idProdottoShop: prodotto.idProdottoShop,
    noteProdotto: prodotto.noteProdotto,
    quantitaProdotto: prodotto.quantitaProdotto,
    checkedProdotto: prodotto.checkedProdotto
  };

  return this.http.put(url, body).pipe(
    tap(() => {
      const lista = this.liste.find(l => l.prodotti.some(p => p.idProdottoLista === idProdottoLista));
      if (lista) {
        const index = lista.prodotti.findIndex(p => p.idProdottoLista === idProdottoLista);
        if (index !== -1) {
          lista.prodotti[index] = { ...lista.prodotti[index], ...body };
          this.listaCorrenteSubject.next({ ...lista });
        }
      }
    })
  );
}


  rimuoviProdottoApi(idLista: number, idProdottoLista: number): Observable<any> {
    const url = `http://localhost:8080/liste/prodotti/${idProdottoLista}`;
    return this.http.delete(url).pipe(
      tap(() => {
        const lista = this.liste.find(l => l.idLista === idLista);
        if (lista) {
          lista.prodotti = lista.prodotti.filter(p => p.idProdottoLista !== idProdottoLista);
          this.listaCorrenteSubject.next({ ...lista });
        }
      })
    );
  }

  
  creaLista(nomeLista: string, dataPrevista: string): Observable<{ listeSpesa: Lista[] }> {
      return this.creaListaApi(nomeLista, dataPrevista);
  }
   

  creaListaApi(nomeLista: string, dataPrevista: string): Observable<{ listeSpesa: Lista[] }> {

    const nuovaLista: Lista = {
      nomeLista: nomeLista,
      dataPrevista: dataPrevista, 
      prodotti: [],
      idLista: 0
    };

    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '23'
      })
    };

      return this.http.post<{ listeSpesa: Lista[] }>(this.POST, nuovaLista, options).pipe(
        switchMap(listaCreata => {
          console.log(listaCreata);
          console.log('Lista creata con ID:', listaCreata.listeSpesa[0].idLista);

          listaCreata.listeSpesa[0].nomeLista = nomeLista;

          return this.getListe().pipe(
            tap(() => {
              this.selezionaLista(listaCreata.listeSpesa[0].nomeLista);
              console.log("Lista creata: " + listaCreata.listeSpesa[0].nomeLista);
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

        const listaSelezionata = this.listaCorrenteSubject.value;
        if (listaSelezionata && listaSelezionata.idLista === idLista) {
          this.listaCorrenteSubject.next(null);
        }

        console.log(`Lista con id ${idLista} eliminata`);
      })
    );
  }

  
}
