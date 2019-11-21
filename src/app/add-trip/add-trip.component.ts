import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Trip } from '../models/trip.model';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  @Output() addTrip: EventEmitter<Trip> = new EventEmitter();

  addTripForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.addTripForm = new FormGroup({
      name: new FormControl(),
      country: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      cost: new FormControl(),
      maxSeats: new FormControl(),
      currency: new FormControl(),
      description: new FormControl(),
      photo: new FormControl(),
    })
  }

}
