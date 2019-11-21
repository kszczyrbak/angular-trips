import { Injectable } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private products: Trip[] = [
    { name: 'Trip 1', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 210, currency: Currency.EUR, maxSeats: 18, seatsLeft: 18, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 2', country: 'Polska', rating: 2.8, startDate: Date(), endDate: Date(), cost: 45, currency: Currency.USD, maxSeats: 11, seatsLeft: 11, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 3', country: 'Tunezja', rating: 3.2, startDate: Date(), endDate: Date(), cost: 210, currency: Currency.EUR, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 4', country: 'Bułgaria', rating: 4.5, startDate: Date(), endDate: Date(), cost: 900, currency: Currency.PLN, maxSeats: 5, seatsLeft: 5, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 5', country: 'Francja', startDate: Date(), endDate: Date(), cost: 400, currency: Currency.USD, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 6', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 435, currency: Currency.EUR, maxSeats: 35, seatsLeft: 35, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 7', country: 'Hiszpania', rating: 5, startDate: Date(), endDate: Date(), cost: 2560, currency: Currency.PLN, maxSeats: 9, seatsLeft: 9, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 8', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 210, currency: Currency.USD, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 9', country: 'Egipt', startDate: Date(), endDate: Date(), cost: 890, currency: Currency.EUR, maxSeats: 45, seatsLeft: 45, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    { name: 'Trip 10', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 210, currency: Currency.USD, maxSeats: 28, seatsLeft: 28, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }
  ]

  constructor() { }

  getProducts(): Trip[] {
    return this.products;
  }

  getProduct(id: number): Trip {
    return this.products[id];
  }

  addProduct(product: Trip) {
    if (!product.photo)
      product.photo = 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
    product.seatsLeft = product.maxSeats
    this.products.push(product);
  }

  deleteProduct(product: Trip) {
    let index = this.products.indexOf(product)
    if (index > -1) {
      this.products.splice(index, 1)
    }
  }
}
