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

  private apiUrl: string = `http://${environment.backendUrl}/users`

  constructor(private httpClient: HttpClient) {
    this.getUsers().subscribe(
      users => console.log(users),
      err => console.log(err)
    )
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


}