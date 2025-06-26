
export interface Utente {
  id: number;
  nome: string;
  cognome: string | null;
  email: string;
  password: string | null;
}