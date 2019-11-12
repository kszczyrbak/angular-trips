import { Component, OnInit } from '@angular/core';
import { Wycieczka } from './wycieczka.model';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {

  products: Wycieczka[] = [
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 0, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 2, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5.50, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
  ]

  constructor() { }

  setupProducts() {
    console.log({'nazwa': 'a', 'kraj': 'b'})
  }

  ngOnInit() {
    this.setupProducts();
  }

}
