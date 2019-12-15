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

  addTripForm: FormGroup;

  currentDate = this.getStringFromDate(new Date(), "yyyy-MM-dd")

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
    this.currentDate = this.getStringFromDate(new Date()
      , 'yyyy-MM-dd')
    this.addTripForm.controls['startDate'].setValue(this.currentDate)
    this.addTripForm.controls['endDate'].setValue(this.currentDate)

    if (this.data) {
      this.addTripForm.patchValue(this.data)
    }
  }

  submit() {
    this.dialogRef.close(this.addTripForm.value);
  }

}
