// prayer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prayer } from './prayer.model';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  private apiUrl = 'http://localhost:8083/api/prayers';

  constructor(private http: HttpClient) { }

  getPrayerTimes(): Observable<Prayer[]> {
    return this.http.get<Prayer[]>(this.apiUrl);
  }
}
