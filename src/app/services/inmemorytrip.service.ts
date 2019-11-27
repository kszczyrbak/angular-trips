import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Trip, Currency } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryTripService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let trips: Trip[] = [
      { id: 0, name: 'Trip 1', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 210, currency: Currency.EUR, maxSeats: 18, seatsLeft: 18, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 1, name: 'Trip 2', country: 'Polska', rating: 2.8, startDate: Date(), endDate: Date(), cost: 45, currency: Currency.USD, maxSeats: 11, seatsLeft: 11, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 2, name: 'Trip 3', country: 'Tunezja', rating: 3.2, startDate: Date(), endDate: Date(), cost: 210, currency: Currency.EUR, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 3, name: 'Trip 4', country: 'Bułgaria', rating: 4.5, startDate: Date(), endDate: Date(), cost: 900, currency: Currency.PLN, maxSeats: 5, seatsLeft: 5, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 4, name: 'Trip 5', country: 'Francja', startDate: Date(), endDate: Date(), cost: 400, currency: Currency.USD, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 5, name: 'Trip 6', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 435, currency: Currency.EUR, maxSeats: 35, seatsLeft: 35, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 6, name: 'Trip 7', country: 'Hiszpania', rating: 5, startDate: Date(), endDate: Date(), cost: 2560, currency: Currency.PLN, maxSeats: 9, seatsLeft: 9, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 7, name: 'Trip 8', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 210, currency: Currency.USD, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 8, name: 'Trip 9', country: 'Egipt', startDate: Date(), endDate: Date(), cost: 890, currency: Currency.EUR, maxSeats: 45, seatsLeft: 45, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { id: 9, name: 'Trip 10', country: 'Turcja', startDate: Date(), endDate: Date(), cost: 210, currency: Currency.USD, maxSeats: 28, seatsLeft: 28, description: 'Lorem ipsum ', photo: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }
    ]
    return {
      trips: trips
    };
  }
}
