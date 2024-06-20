import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private baseUrl = 'http://localhost:8087/api/users';
  private authUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  getAllUtilisateurs(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUtilisateurById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/adduser`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.authUrl}/updateuser/${id}`, user);
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteuser/${id}`);
  }

  authenticate(name: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/authenticate`, { name, password }, { responseType: 'text' });
  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, registerData);
  }
}
