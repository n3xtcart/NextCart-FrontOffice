import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './_models/categoria';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // da richiedere 
  private apiUrl = 'https://api.mockaron.com/mock/bufcwlbupc/categoria-prodotto'; 

  array: Categoria[] = []
  categoriaSelezionataSubject = new Subject<Categoria>();
  categoriaSelezionata$ = this.categoriaSelezionataSubject.asObservable();


  constructor(private http: HttpClient) {
   
  }

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  selezionaCategoria(categoria: any) {
    this.categoriaSelezionataSubject.next(categoria);
  }

  
}
