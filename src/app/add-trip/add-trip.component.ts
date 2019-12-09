import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  @Output() addTrip: EventEmitter<Trip> = new EventEmitter();

  currency = Currency;
  currencies: string[]

  addTripForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddTripComponent>) { }

  ngOnInit() {
    this.addTripForm = new FormGroup({
      name: new FormControl("", [Validators.minLength(4), Validators.required]),
      country: new FormControl("", Validators.required),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.min(0)]),
      maxSeats: new FormControl("", [Validators.required, Validators.min(0)]),
      currency: new FormControl(),
      description: new FormControl()
    })
    this.addTripForm.controls['startDate'].setValue(new Date())

    this.currencies = Object.keys(this.currency).filter(k => !isNaN(Number(k)))

  }

  submit() {
    this.dialogRef.close(this.addTripForm.value);
  }

  close() {
    this.dialogRef.close();
  }


}
