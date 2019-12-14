import { Component, OnInit } from '@angular/core';
import { Currency, Trip } from '../models/trip.model';
import { TripService } from '../services/trip.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddTripComponent } from '../add-trip/add-trip.component';
import { CurrencyService } from '../services/currency.service';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FiredbService } from '../services/firedb.service';
import { photoPlaceholder } from 'src/assets/fake-dane';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';

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

  constructor(private tripService: TripService, private dialog: MatDialog, private currencyService: CurrencyService, private userService: UserService, private spinnerService: SpinnerOverlayService) {
  }

  getBorderClass(product: Trip) {
    let price = product.price;

    let max = this.products.length
    if (price == this.products[0].price && this.products.length > 1) {
      return 'cheapest'
    }
    if (price == this.products[max - 1].price && this.products.length > 1) {
      return 'expensive'
    }
    else
      return 'default'
  }

  onFilterChange(filters: any) {
    this.filterObj = filters;
  }

  sortTrips(products: Trip[]) {
    return products.sort((a, b) => a.price - b.price)
  }

  getTrips() {
    this.spinnerService.show();
    this.tripService.getProducts().subscribe(
      products => {
        this.products = this.sortTrips(products)
        this.spinnerService.hide();
      },
      error => console.log(error)
    )
  }

  ngOnInit() {
    this.getTrips();
  }

  removeProduct(product: Trip) {
    return this.tripService.deleteProduct(product).subscribe(
      response => {
        this.getTrips();
      },
      err => console.log(err)
    )
  }

  getMaxId() {
    return this.products.map(trip => trip._id).sort((a, b) => (a > b) ? -1 : 1)[0] + 1
  }

  // this.firedb.addTrip(data).then(() =>
  //   console.log('Added trip', data)
  // )
}
