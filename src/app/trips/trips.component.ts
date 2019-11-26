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

  products: Trip[] = [
  ]

  constructor(private tripService: TripService, private dialog: MatDialog, private currencyService: CurrencyService) {
  }

  getBorderClass(product: Trip) {
    let cost = product.cost;

    let max = this.products.length
    if (cost == this.products[0].cost) {
      return 'cheapest'
    }
    if (cost == this.products[max - 1].cost) {
      return 'expensive'
    }
    else
      return 'default'
  }

  getTrips() {
    this.tripService.getProducts().subscribe(
      products => this.products = products.sort((a, b) => this.currencyService.convert(a.cost, a.currency) - this.currencyService.convert(b.cost, b.currency)),
      error => console.log(error)
    )
  }

  ngOnInit() {
    this.getTrips()
  }

  removeProduct(product: Trip) {
    this.tripService.deleteProduct(product).subscribe(
      response => {
        this.getTrips()
      }
    )
  }

  // sortTrips() {
  //   this.products = this.products.sort((a, b) => this.currencyService.convert(a.cost, a.currency) - this.currencyService.convert(b.cost, b.currency))
  // }

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
