import { ProdottoCategoria } from "./prodottoCategoria";

export interface Categoria {

    id: number;
    name: string;
    percorsoImmagine: string;
    numeroProdotti: number;
    prodotti: ProdottoCategoria[];

}