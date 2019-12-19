import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Trip } from '../models/trip.model';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/user.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  products: Trip[] = []
  user: AppUser;

  constructor(private cartService: CartService, private authService: AuthService, private orderService: OrderService, private _location: Location) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(
      user => this.user = user
    )
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

  goBack() {
    this._location.back();
  }

  checkout() {
    let user_id = this.user._id

    let orders = this.products.map(function (product) {
      return {
        trip_id: product._id,
        user_id: user_id,
        count: product.cartCount,
        totalPrice: product.price * product.cartCount,
        date: new Date()
      }
    })

    this.orderService.order(orders).subscribe(
      data => {
        console.log(data)
        this.products = []
      }
    )
  }

}