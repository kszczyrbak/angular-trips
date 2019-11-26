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

  currency = Currency
  currencies: string[]

  chosenCurrency = this.currency.PLN;

  constructor(private cartService: CartService, private currencyService: CurrencyService) { }

  ngOnInit() {
    this.products = this.cartService.getCartProducts()
    this.currencies = Object.keys(this.currency).filter(k => !isNaN(Number(k)))
  }

  delete(product: Trip) {
    this.cartService.deleteProduct(product)
  }

  totalPrice() {
    if (this.products.length > 0)
      return this.products.map(product => this.currencyService.convert(product.cost * product.cartCount, product.currency)).reduce((acc, val) => acc + val);
    else return 0;
  }

  inc(product: Trip) {
    product.cartCount += 1
  }

  dec(product: Trip) {
    if (product.cartCount > 0)
      product.cartCount -= 1

    if (product.cartCount == 0) {
      let index = this.products.indexOf(product)
      this.products.splice(index, 1)
    }
  }

}