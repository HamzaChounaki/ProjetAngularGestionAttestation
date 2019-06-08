import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../config/api.url.config';
import { Employe } from '../beans/Employe'


@Injectable({
    providedIn: 'root'
})
export class EmployeService {


    constructor(private http: HttpClient) { }

    getEmployes(): Observable<any> {
        return this.http.get(API_URLS.EMPLOYE_URL);
    }

    addEmploye(employe: Employe): Observable<any> {
        return this.http.post(API_URLS.EMPLOYE_URL, employe);
    }

    updateEmploye(employe: Employe): Observable<any> {
        return this.http.put(API_URLS.EMPLOYE_URL, employe);
    }

    deleteEmploye(id: number): Observable<any> {
        console.log("ici " + id);
        return this.http.delete(API_URLS.EMPLOYE_URL + `/${id}`);
    }

    getEmployeById(id: number): Observable<any> {
        return this.http.get(API_URLS.EMPLOYE_URL + `/${id}`);
    }
}
