import { Injectable } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = `${environment.backendUrl}/trips`

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get<Trip[]>(this.apiUrl);
  }

  getProduct(_id: number) {
    return this.httpClient.get<Trip>(`${this.apiUrl}/${_id}`);
  }

  addProduct(product: Trip) {
    product.seatsLeft = product.maxSeats
    product.rating = 0
    product.photos = []
    return this.httpClient.post<Trip>(this.apiUrl, product);
  }

  editProduct(product: Trip) {
    let _id = product._id;
    return this.httpClient.put<Trip>(`${this.apiUrl}/${_id}`, product);
  }

  deleteProduct(product: Trip) {
    let _id = product._id;
    return this.httpClient.delete<Trip>(`${this.apiUrl}/${_id}`);
  }
}
