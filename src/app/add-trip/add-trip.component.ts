import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Trip } from '../models/trip.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  @Output() addTrip: EventEmitter<Trip> = new EventEmitter();

  addTripForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddTripComponent>) { }

  ngOnInit() {
    this.addTripForm = new FormGroup({
      name: new FormControl("", [Validators.minLength(4), Validators.required]),
      country: new FormControl("", Validators.required),
      startDate: new FormControl(),
      endDate: new FormControl(),
      cost: new FormControl("", [Validators.required, Validators.min(0)]),
      maxSeats: new FormControl("", [Validators.required, Validators.min(0)]),
      currency: new FormControl(),
      description: new FormControl()
    })
  }

  submit() {
    this.dialogRef.close(this.addTripForm.value);
  }
  
  close() {
    this.dialogRef.close();
  }


}
