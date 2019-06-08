import { Profil } from './Profil';
import { Etablissement } from './Etablissement';

export class Employe{
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public dateNaissance?: any,
    public lieuNaissance?: string,
    public dateEmbauche?: any,
    public login?: string,
    public password?: string,
    public profil?: any,
    public etablissement?: any,
    public compte?: any
  )
  {
    
  }
}
