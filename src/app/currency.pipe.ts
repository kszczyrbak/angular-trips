import { Pipe, PipeTransform } from '@angular/core';
import { Waluta } from './wycieczki/wycieczka.model';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(currency: Waluta): string {
    switch (currency) {
      case Waluta.USD: {
        return '$'
      }
      case Waluta.EUR: {
        return '€'
      }
      case Waluta.PLN: {
        return 'zł'
      }
    }
  }

}
