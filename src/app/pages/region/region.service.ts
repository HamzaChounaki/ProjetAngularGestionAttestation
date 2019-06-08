import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../config/api.url.config';
import { Region } from '../beans/Region'

@Injectable({
    providedIn: 'root'
})
export class RegionService{
    constructor(private http : HttpClient){

    }

    getRegions() : Observable<any>{
        return this.http.get(API_URLS.REGION_URL);
    }

    addRegion(region : Region) : Observable<any>{
        return this.http.post(API_URLS.REGION_URL, region);
    }

    getRegionById(id : number) : Observable<any>{
        return this.http.get(API_URLS.REGION_URL + `/${id}`);
    }

    updateRegion(region : Region) : Observable<any>{
        return this.http.put(API_URLS.REGION_URL, region);
    }

    deleteRegion(id : number) : Observable<any>{
        console.log('Ici ' + id);
        return this.http.delete(API_URLS.REGION_URL + `/${id}`);
    }
}