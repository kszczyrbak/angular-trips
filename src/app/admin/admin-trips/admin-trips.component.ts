import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { SpinnerOverlayService } from 'src/app/spinner/spinner-overlay.service';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.css']
})
export class AdminTripsComponent implements OnInit {

  trips: Trip[]

  constructor(private tripService: TripService, private spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.getTrips();
  }

  private getTrips() {
    this.spinnerService.show();
    this.tripService.getProducts().subscribe(trips => {
      this.trips = trips;
      this.spinnerService.hide();
    });
  }

  delete(trip: Trip){
    this.tripService.deleteProduct(trip).subscribe(
      response => this.getTrips()
    )
  }

  edit(trip: Trip){

  }

}
