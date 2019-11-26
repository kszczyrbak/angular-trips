import { Injectable } from '@angular/core';
import { Currency } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencyRatesToPLN = new Map([
    [Currency.EUR, 4.30],
    [Currency.PLN, 1],
    [Currency.USD, 3.90]
  ]
  )

  constructor() { }

  convert(price: number, currency: Currency) {
    return price * this.currencyRatesToPLN.get(currency);
  }
}
