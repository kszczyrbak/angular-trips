import { Injectable } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: Trip[] = [
  ]

  constructor() { }

  getCartProducts(): Trip[] {
    return this.cartProducts;
  }

  getProduct(id: number): Trip {
    return this.cartProducts[id];
  }

  addProduct(product: Trip) {
    let cartProduct = this.cartProducts.find(prod => prod.id == product.id)
    console.log(cartProduct)
    if (cartProduct)
      cartProduct.cartCount += 1;
    else {
      product.cartCount = 1;
      this.cartProducts.push(product);
    }
  }

  deleteProduct(product: Trip) {
    let index = this.cartProducts.indexOf(product)
    if (index > -1) {
      this.cartProducts.splice(index, 1)
    }
  }
}
