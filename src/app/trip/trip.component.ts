import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @Input() tripData: Trip
  @Output() removeEvent = new EventEmitter<Trip>()

  constructor() { }

  ngOnInit() {
  }

  removeProduct() {
    this.removeEvent.emit(this.tripData)
  }


  book() {
    if (this.tripData.seatsLeft > 0) this.tripData.seatsLeft -= 1
  }

  unbook() {
    if (this.tripData.seatsLeft < this.tripData.maxSeats) this.tripData.seatsLeft += 1
  }

  onRate($event: { oldValue: number, newValue: number }) {
    this.tripData.rating = $event.newValue;
  }


}

