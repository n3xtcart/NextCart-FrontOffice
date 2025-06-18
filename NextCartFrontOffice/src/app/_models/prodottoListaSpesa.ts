export interface ProdottoListaSpesa {

  idProdottoLista?: number;      
  nomeProdotto?: string;
  categoriaProdotto?: string;
  tipologiaProdotto?: string;

  idProdottoShop: number;        
  quantitaProdotto: number;     
  noteProdotto?: string;         
  checkedProdotto: boolean;      
}