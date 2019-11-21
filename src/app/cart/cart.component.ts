import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Trip, Currency } from '../models/trip.model';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Trip[] = []

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products = this.cartService.getProducts()
    this.products.push(
      { name: 'Trip 1', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 210, currency: Currency.EUR, maxSeats: 18, seatsLeft: 18, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }
    )
  }

}
