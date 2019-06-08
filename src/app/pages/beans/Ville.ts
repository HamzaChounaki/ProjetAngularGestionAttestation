import { Region } from './Region';

export class Ville{
  constructor(
    public id?: number,
    public codePostale?: number,
    public nom?: string,
    public region?: any
  ){

  }
}
