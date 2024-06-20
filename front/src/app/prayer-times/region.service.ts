import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../prayer-times/region.model'; // Assurez-vous d'importer correctement l'interface Region

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  prieres: any;


  constructor(private http: HttpClient) { }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>('http://localhost:8083/api/regions');
  }



  getPrayers(): Observable<any> {
    return this.http.get('http://localhost:8083/api/prayers');
  }
}
