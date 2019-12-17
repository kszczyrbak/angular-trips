
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;

  @Output() filterChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  getStringFromDate(date: Date, format: string) {
    let pipe = new DatePipe('en-US')
    let stringDate = pipe.transform(date, format);
    console.log(stringDate)
    return stringDate
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      priceMin: new FormControl(''),
      priceMax: new FormControl(''),
      dateMin: new FormControl(''),
      dateMax: new FormControl(''),
      ratingMin: new FormControl(''),
      ratingMax: new FormControl(''),
      destination: new FormControl('')
    });

    let currentDate = this.getStringFromDate(new Date()
      , 'yyyy-MM-dd')
    this.filterForm.controls['dateMin'].setValue(currentDate)
    this.filterForm.controls['priceMin'].setValue(0)
    this.filterForm.controls['ratingMin'].setValue(0)

    this.onChanges();
  }



  onChanges() {
    this.filterForm.valueChanges.subscribe(
      filterObj => {
        Object.keys(filterObj).forEach(key =>
          filterObj[key] === '' ? delete filterObj[key] : key
        );
        this.filterChange.emit(filterObj);
      }
    )
  }

}