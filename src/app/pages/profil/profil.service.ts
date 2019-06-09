import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../config/api.url.config';
import { Profil } from '../beans/Profil'

@Injectable({
    providedIn: 'root'
})
export class ProfilService {

  constructor(private http :HttpClient){

  }
  getProfils(): Observable<any>{
      return this.http.get(API_URLS.PROFIL_URL);
  }
  
  addProfil(profil:Profil): Observable<any>{
      return this.http.post(API_URLS.PROFIL_URL, profil);
  }

  getProfilById(id:number): Observable<any>{
    return this.http.get(API_URLS.PROFIL_URL+`/${id}`);
}

  updateProfil(profil:Profil): Observable<any>{
      return this.http.put(API_URLS.PROFIL_URL, profil);
  }

  deleteProfil(id:number): Observable<any>{
      console.log("Ici "+ id);
      return this.http.delete(API_URLS.PROFIL_URL +`/${id}`);
  }

  CountEmpnoParProfil(): Observable<any> {
      return this.http.get(API_URLS.PROFIL_URL);
  }
}