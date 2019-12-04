
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;

  @Output() filterChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

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