import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../config/api.url.config';
import { Attestation } from '../beans/Attestation'

@Injectable({
    providedIn:'root'
})

export class AttestationService {
    constructor(private http : HttpClient){}

    getAttestations() : Observable<any>{
        return this.http.get(API_URLS.ATTESTATION_URL);
    }
    addAttestation(attestation:Attestation): Observable<any>{
        return this.http.post(API_URLS.ATTESTATION_URL, attestation);
    }
    
    updateAttestation(attestation:Attestation): Observable<any>{
        return this.http.put(API_URLS.ATTESTATION_URL, attestation);
    }
    
    deleteAttestation(id:number): Observable<any>{
        console.log("Ici "+ id);
        return this.http.delete(API_URLS.ATTESTATION_URL +`/${id}`);
    }
  
    getAttestationById(id:number): Observable<any>{
      return this.http.get(API_URLS.ATTESTATION_URL+`/${id}`);
  }
}