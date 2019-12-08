import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;

  // private apiUrl: string = `${environment.backendUrl}/users/`

  constructor(private httpClient: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('localhost:5000/users/')
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`localhost:5000/users/${id}`)
  }

  addUser(user: User): Observable<User> {
    console.log(user);
    return this.httpClient.post<User>('localhost:5000/users/', user)
  }


}
