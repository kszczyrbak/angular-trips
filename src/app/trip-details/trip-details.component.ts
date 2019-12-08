import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip

  constructor(private route: ActivatedRoute, private tripService: TripService) {
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

  book() {
    this.trip.seatsLeft -= 1;
  }

  unbook() {
    this.trip.seatsLeft += 1;
  }

}
