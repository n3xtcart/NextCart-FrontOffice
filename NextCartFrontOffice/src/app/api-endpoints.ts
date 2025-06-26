export const API_ENDPOINTS = {
  LOGIN: 'http://192.168.10.4:8080/users/login',
  REGISTER: 'http://192.168.10.4:8080/users/register',
  UPDATE_USER: 'http://192.168.10.4:8080/users',
  DELETE_USER: 'http://192.168.10.4:8080/users',
  REFRESH_TOKEN: 'http://192.168.10.4:8080/users/refresh-token',
  CATEGORIE: 'http://192.168.10.47:8080/api/v1/categorie',
  PRODOTTI_PER_CATEGORIA: 'http://192.168.10.47:8080/api/v1/prodotti/categoria',
  RUOLO_CONCESSO: 'user',

  OTTIENI_LISTE : 'http://localhost:8080/liste-spesa/utente',
  LISTA_SPESA : 'http://localhost:8080/liste-spesa',
  DETTAGLIO_PRODOTTO : 'http://localhost:8080/liste/prodotti',
  LISTA_PRODOTTI: (idLista: number) => `http://localhost:8080/liste/${idLista}/prodotti`,
  
};

