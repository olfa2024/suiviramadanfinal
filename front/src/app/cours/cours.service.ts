import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }

  getImagesAndVideos(): Observable<any> {
    return this.http.get<any>('http://localhost:8089/api/media');
  }
}
