import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './_models/categoria';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'https://6826ef9b397e48c91317d97b.mockapi.io/categorie'; // da richiedere al BackOffice

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
