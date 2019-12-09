import { Injectable } from '@angular/core';
import { User, SecurityRole } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = `http://localhost:5000/users`

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl)
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`)
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user)
  }

  getUserRole(email: String) {
    return this.httpClient.get<SecurityRole>(`${this.apiUrl}/role/${email}`);
  }


}
