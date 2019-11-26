import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../../models/trip.model';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {

  transform(currency: Currency): string {
    switch (currency) {
      case Currency.USD: {
        return '$'
      }
      case Currency.EUR: {
        return '€'
      }
      case Currency.PLN: {
        return 'zł'
      }
    }
  }

}
