import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Trip, Currency } from '../models/trip.model';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CurrencyService } from '../services/currency.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  products: Trip[] = []

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products = this.cartService.getCartProducts()
    console.log(this.products)
  }

  delete(product: Trip) {
    this.cartService.deleteProduct(product)
  }

  totalPrice() {
    if (this.products.length > 0)
      return this.products.map(product => (product.price * product.cartCount)).reduce((acc, val) => acc + val);
    else return 0;
  }

  inc(product: Trip) {
    product.cartCount += 1
  }

  dec(product: Trip) {
    if (product.cartCount > 0)
      product.cartCount -= 1

    if (product.cartCount == 0) {
      this.cartService.deleteProduct(product)
    }
  }

}