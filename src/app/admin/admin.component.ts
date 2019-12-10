import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  trips: Trip[]

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.getProducts().subscribe(
      products => this.trips = products
    )
  }

}
