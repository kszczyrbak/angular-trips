import { Injectable } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Trip[] = [
  ]

  constructor() { }

  getProducts(): Trip[] {
    return this.products;
  }

  getProduct(id: number): Trip {
    return this.products[id];
  }

  addProduct(product: Trip) {
    console.log(product)
    this.products.push(product);
  }

  deleteProduct(product: Trip) {
    let index = this.products.indexOf(product)
    if (index > -1) {
      this.products.splice(index, 1)
    }
  }
}
