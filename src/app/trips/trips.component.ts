import { Component, OnInit } from '@angular/core';
import { Currency, Trip } from '../models/trip.model';
import { TripService } from '../services/trip.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddTripComponent } from '../add-trip/add-trip.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  products: Trip[] = [
  ]

  constructor(private tripService: TripService, private dialog: MatDialog) {
    this.products = tripService.getProducts();
  }

  getBorderClass(product: Trip) {
    let cost = product.cost;
    let sorted = this.products.sort((a, b) => a.cost - b.cost);

    let max = sorted.length
    if (cost == sorted[0].cost) {
      return 'cheapest'
    }
    if (cost == sorted[max - 1].cost) {
      return 'expensive'
    }
    else
      return 'default'
  }

  ngOnInit() {
    // this.setupProducts();
  }

  removeProduct(product: Trip) {
    this.tripService.deleteProduct(product)
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddTripComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.tripService.addProduct(data);
      }
    });
  }

}
