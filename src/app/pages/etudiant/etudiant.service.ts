import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../config/api.url.config';
import { Etudiant } from '../beans/Etudiant'

@Injectable({
    providedIn: 'root'
})

export class EtudiantService {
    constructor(private http : HttpClient){}

    getEtudiants(): Observable<any>{
        return this.http.get(API_URLS.ETUDIANT_URL);
    }

    addEtudiant(etudiant:Etudiant): Observable<any>{
        return this.http.post(API_URLS.ETUDIANT_URL, etudiant);
    }

    updateEtudiant(etudiant:Etudiant): Observable<any>{
        return this.http.put(API_URLS.ETUDIANT_URL, etudiant);
    }

    deleteEtudiant(id:number): Observable<any>{
        console.log("ici "+ id);
        return this.http.delete(API_URLS.ETUDIANT_URL+ `/${id}`);
    }

    getEtudiantById(id:number): Observable<any>{
        return this.http.get(API_URLS.ETUDIANT_URL+`/${id}`);
    }
}