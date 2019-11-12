import { Component, OnInit } from '@angular/core';
import { Wycieczka, Waluta } from './wycieczka.model';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {

  products: Wycieczka[] = [
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 210, Waluta.USD, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 5500, Waluta.PLN, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 400, Waluta.EUR, 5, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 2000, Waluta.PLN, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 450, Waluta.USD, 2, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 700, Waluta.USD, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 380, Waluta.EUR, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Wycieczka('Wycieczka 1', 'Turcja', Date(), Date(), 600, Waluta.USD, 20, 'Lorem ipsum ', 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
  ]

  constructor() { }

  book(product: Wycieczka) {
    let index = this.products.indexOf(product)
    if (this.products[index].iloscMiejsc > 0)
      this.products[index].iloscMiejsc -= 1;
  }

  unbook(product: Wycieczka) {
    let index = this.products.indexOf(product)
    if (this.products[index].iloscMiejsc < this.products[index].maxMiejsc)
      this.products[index].iloscMiejsc += 1;
  }

  getBorderClass(product: Wycieczka) {
    let cost = product.cena;
    let sorted = this.products.sort((a, b) => a.cena - b.cena);

    let max = sorted.length
    if (cost == sorted[0].cena) {
      return 'cheapest'
    }
    if (cost == sorted[max-1].cena) {
      return 'expensive'
    }
    else
      return 'default'
  }

  setupProducts() {
    console.log({ 'nazwa': 'a', 'kraj': 'b' })
  }

  ngOnInit() {
    this.setupProducts();
  }

}
