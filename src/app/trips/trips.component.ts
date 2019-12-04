import { Component, OnInit } from '@angular/core';
import { Currency, Trip } from '../models/trip.model';
import { TripService } from '../services/trip.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddTripComponent } from '../add-trip/add-trip.component';
import { CurrencyService } from '../services/currency.service';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  faFilter = faFilter;

  filterObj: any = {};

  products: Trip[] = [
  ]

  constructor(private tripService: TripService, private dialog: MatDialog, private currencyService: CurrencyService) {
  }

  getBorderClass(product: Trip) {
    let price = product.price;

    let max = this.products.length
    if (price == this.products[0].price) {
      return 'cheapest'
    }
    if (price == this.products[max - 1].price) {
      return 'expensive'
    }
    else
      return 'default'
  }

  onFilterChange(filters: any) {
    this.filterObj = filters;
  }

  sortTrips(products: Trip[]) {
    console.log(products)
    return products.sort((a, b) => this.currencyService.convert(a.price, a.currency) - this.currencyService.convert(b.price, b.currency))
  }

  getTrips() {
    this.tripService.getProducts().subscribe(
      products => this.products = this.sortTrips(products),
      error => console.log(error)
    )
  }

  ngOnInit() {
    this.getTrips();
  }

  removeProduct(product: Trip) {
    this.tripService.deleteProduct(product).subscribe(
      response => {
        this.getTrips()
      }
    )
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddTripComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.tripService.addProduct(data).subscribe(
          (addedProduct: Trip) => {
            this.getTrips()
          }
        )
      }
    });
  }

}
