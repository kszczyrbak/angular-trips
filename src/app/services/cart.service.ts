import { Injectable } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = `${environment.backendUrl}/orders`

  cartCount$: Subject<number> = new Subject<number>();

  private cartProducts: Trip[] = [
  ]

  constructor(private httpClient: HttpClient) { }

  getCartProducts(): Trip[] {
    return this.cartProducts;
  }

  getCartCount(id: string): number {
    return this.cartProducts.find(
      product => product._id = id
    ).cartCount
  }

  getProduct(id: number): Trip {
    return this.cartProducts[id];
  }

  addProduct(product: Trip) {
    let cartProduct = this.cartProducts.find(prod => prod._id == product._id)
    console.log(cartProduct)
    if (cartProduct)
      cartProduct.cartCount += 1;
    else {
      product.cartCount = 1;
      this.cartProducts.push(product);
    }
    this.cartCount$.next(this.cartProducts.length)
  }

  unbookProduct(product: Trip) {
    product.cartCount -= 1;
    if (product.cartCount == 0)
      this.deleteProduct(product)
  }

  deleteProduct(product: Trip) {
    let index = this.cartProducts.indexOf(product)
    if (index > -1) {
      this.cartProducts.splice(index, 1)
    }
    this.cartCount$.next(this.cartProducts.length)
  }
}
