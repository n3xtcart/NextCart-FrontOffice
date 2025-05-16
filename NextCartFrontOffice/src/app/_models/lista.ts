import { ProdottoListaSpesa } from "./prodottoListaSpesa";

export interface Lista {

	idLista: number;
	nomeLista: string;       
	dataPrevista: Date;
	prodotti: ProdottoListaSpesa[];
}