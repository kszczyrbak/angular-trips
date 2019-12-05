import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Trip[], filters: any): Trip[] {
    return products.filter(trip => {
      if (this.filterPrice(trip, filters) && this.filterDate(trip, filters) && this.filterProperties(trip, filters))
        return true;
      else
        return false;
    });
  }

  filterPrice(product: Trip, filters: any) {
    let val = (filters['priceMin'] ? (product.price > filters['priceMin']) : true) && (filters['priceMax'] ? (product.price < filters['priceMax']) : true);
    return val;
  }

  filterDate(product: Trip, filters: any) {
    return (filters['dateMin'] ? (product.startDate > filters['dateMin']) : true) && (filters['dateMax'] ? (product.endDate < filters['dateMax']) : true);
  }

  filterProperties(product: Trip, filters: any) {
    return (filters['destination'] ? (product.country.includes(filters['destination'])) : true)
  }

}
