import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip

  constructor(private route: ActivatedRoute, private tripService: TripService, private _location: Location) {
  }

  ngOnInit() {
    let id = this.route.params.subscribe(
      params => this.tripService.getProduct(params["id"]).subscribe(
        trip => {
          console.log(trip);
          this.trip = trip;
        },
        error => console.log(error)
      )
    )
  }

  goBack() {
    this._location.back();
  }

  book() {
    this.trip.seatsLeft -= 1;
  }

  unbook() {
    this.trip.seatsLeft += 1;
  }

}
