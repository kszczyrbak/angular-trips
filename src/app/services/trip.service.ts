import { Injectable } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = 'http://localhost:5000/trips'

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get<Trip[]>(this.apiUrl);
  }

  getProduct(_id: number) {
    return this.httpClient.get<Trip>(`${this.apiUrl}/${_id}`);
  }

  addProduct(product: Trip) {
    if (!product.photo)
      product.photo = 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
    product.seatsLeft = product.maxSeats
    product.rating = 0
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
