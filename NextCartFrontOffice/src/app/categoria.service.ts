import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './_models/categoria';
import { Observable, Subject } from 'rxjs';
import { API_ENDPOINTS } from './api-endpoints';
import { ProdottoCategoria } from './_models/prodottoCategoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // da richiedere 
  private apiUrl = API_ENDPOINTS.CATEGORIE; 
  private apiprodottiPerCategoria = API_ENDPOINTS.PRODOTTI_PER_CATEGORIA;

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



getProdottiPerCategoria(categoriaId: string | number): Observable<ProdottoCategoria[]> {
  return this.http.get<ProdottoCategoria[]>(`${this.apiprodottiPerCategoria}/${categoriaId}`);
}

  
}
