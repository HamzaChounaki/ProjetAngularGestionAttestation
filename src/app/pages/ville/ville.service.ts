import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../config/api.url.config';
import { Ville } from '../beans/Ville'

@Injectable({
    providedIn: 'root'
  })
  export class VilleService {
  
    
    constructor(private http :HttpClient) { }
  
    getVilles(): Observable<any>{
      return this.http.get(API_URLS.VILLE_URL);
  }
  
  addVille(ville:Ville): Observable<any>{
      return this.http.post(API_URLS.VILLE_URL, ville);
  }
  
  updateVille(ville:Ville): Observable<any>{
      return this.http.put(API_URLS.VILLE_URL, ville);
  }
  
  deleteVille(id:number): Observable<any>{
      console.log("Ici "+ id);
      return this.http.delete(API_URLS.VILLE_URL +`/${id}`);
  }

  getVilleById(id:number): Observable<any>{
    return this.http.get(API_URLS.VILLE_URL+`/${id}`);
}
}