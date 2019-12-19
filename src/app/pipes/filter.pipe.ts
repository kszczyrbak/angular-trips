import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Trip[], filters: any): Trip[] {
    return products.filter(trip => {
      if (this.filterPrice(trip, filters) && this.filterSeats(trip, filters) && this.filterDate(trip, filters) && this.filterRating(trip, filters) && this.filterProperties(trip, filters))
        return true;
      else
        return false;
    });
  }

  filterSeats(product: Trip, filters: any) {
    let val = (filters['seatsLeft'] != null ? (product.seatsLeft > filters['seatsLeft']) : true);
    console.log(val)
    return val;
  }

  filterPrice(product: Trip, filters: any) {
    let val = (filters['priceMin'] != null ? (product.price > filters['priceMin']) : true) && (filters['priceMax'] != null ? (product.price < filters['priceMax']) : true);
    console.log(val)
    return val;
  }

  filterDate(product: Trip, filters: any) {
    return (filters['dateMin'] != null ? (product.startDate >= filters['dateMin']) : true) && (filters['dateMax'] != null ? (product.endDate <= filters['dateMax']) : true);
  }

  filterRating(product: Trip, filters: any) {
    return (filters['ratingMin'] != null ? (product.rating >= filters['ratingMin']) : true) && (filters['ratingMax'] != null ? (product.rating <= filters['ratingMax']) : true);
  }

  filterProperties(product: Trip, filters: any) {
    return (filters['destination'] != null ? (product.country.toLowerCase().includes(filters['destination'].toLowerCase())) : true)
  }

}
