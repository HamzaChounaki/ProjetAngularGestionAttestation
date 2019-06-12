import { Employe } from './Employe';
import { Etudiant } from './Etudiant';


export class Attestation{
  constructor(
    public id?: number,
    public numero?: number,
    public dateSortie?: any,
    public etudiant?: any,
    public employe?: any,
  )
  {
    
  }
}
