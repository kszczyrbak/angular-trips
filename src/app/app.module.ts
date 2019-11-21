import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';

import { AppComponent } from './app.component';
import { CurrencyPipe } from './pipes/currency/currency.pipe';
import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trip/trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    CurrencyPipe,
    TripComponent,
    AddTripComponent
  ],
  imports: [
    BrowserModule,
    RatingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddTripComponent]
})
export class AppModule { }
