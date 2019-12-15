import { Injectable } from '@angular/core';
import { Currency, Trip } from '../models/trip.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Comment } from '../models/comment.model'
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.backendUrl}/comments`

  constructor(private httpClient: HttpClient) { }

  getComments() {
    return this.httpClient.get<Comment[]>(this.apiUrl);
  }

  getComment(_id: string) {
    return this.httpClient.get<Comment>(`${this.apiUrl}/${_id}`);
  }

  getCommentsByTrip(trip_id: string) {
    return this.httpClient.get<Comment[]>(`${environment.backendUrl}/trips/${trip_id}/comments`);
  }
  
  addComment(comment: Comment, trip: Trip) {
    let trip_id = trip._id
    return this.httpClient.put<Comment>(`${environment.backendUrl}/trips/${trip_id}/comments`, comment);
  }

  deleteComment(comment: Comment) {
    let _id = comment._id;
    return this.httpClient.delete<Comment>(`${this.apiUrl} / ${_id}`);
  }
}
