import { Injectable } from '@angular/core';
import { SecurityRole, AppUser } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.backendUrl}/users`

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<AppUser[]> {
    return this.httpClient.get<AppUser[]>(this.apiUrl)
  }
  
  getUser(id: number): Observable<AppUser> {
    return this.httpClient.get<AppUser>(`${this.apiUrl}/${id}`)
  }

  addUser(user: AppUser): Observable<AppUser> {
    return this.httpClient.post<AppUser>(this.apiUrl, user)
  }

  // getUserRole(email: String) {
  //   return this.httpClient.get<SecurityRole>(`${this.apiUrl}/role/${email}`);
  // }

  getUserByEmail(email: string): Observable<AppUser> {
    return this.httpClient.get<AppUser>(`${this.apiUrl}/email/${email}`);
  }

  deleteUser(user: AppUser) {
    let _id = user._id;
    return this.httpClient.delete(`${this.apiUrl}/${_id}`);
  }


}
