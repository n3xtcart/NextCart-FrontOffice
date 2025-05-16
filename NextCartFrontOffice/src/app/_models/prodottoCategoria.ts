import { Categoria } from "./categoria";

export interface ProdottoCategoria {

    id: number;
    nome: string;
    descrizione: string;
    quantita: number;
    percorsoImmagine: string;
    categoria: Categoria[];
    tipologia: string;

   }