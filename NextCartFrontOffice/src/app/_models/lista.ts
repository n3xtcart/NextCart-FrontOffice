import { ProdottoListaSpesa } from "./prodottoListaSpesa";

export interface Lista {

	idLista: number;
	nomeLista: string;       
	dataPrevista: string;
	prodotti: ProdottoListaSpesa[];
}