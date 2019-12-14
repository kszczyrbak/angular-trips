import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';


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

  constructor(private dialogRef: MatDialogRef<AddTripComponent>, @Inject(MAT_DIALOG_DATA) public data: Trip) { }

  get name() {
    return this.addTripForm.get('name')
  }

  get maxSeats() {
    return this.addTripForm.get('maxSeats')
  }

  get price() {
    return this.addTripForm.get('price')
  }

  getStringFromDate(date: Date, format: string) {
    let pipe = new DatePipe('en-US')
    let stringDate = pipe.transform(date, format);
    console.log(stringDate)
    return stringDate
  }
  
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
    let currentDate = new Date()
    this.addTripForm.controls['startDate'].setValue(this.getStringFromDate(currentDate, 'yyyy-MM-dd'))
    this.addTripForm.controls['endDate'].setValue(this.getStringFromDate(currentDate, 'yyyy-MM-dd'))

    if (this.data) {
      this.addTripForm.patchValue(this.data)
    }

    this.currencies = Object.keys(this.currency).filter(k => !isNaN(Number(k)))
  }

  submit() {
    this.dialogRef.close(this.addTripForm.value);
  }

  close() {
    this.dialogRef.close();
  }


}
