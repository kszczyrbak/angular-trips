import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';

import { AppComponent } from './app.component';
import { CurrencyPipe } from './pipes/currency/currency.pipe';
import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trip/trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TripService } from './services/trip.service';
import { InMemoryTripService } from './services/inmemorytrip.service';
import { HttpClientModule } from '@angular/common/http';
import { TripDetailsComponent } from './trip-details/trip-details.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    CurrencyPipe,
    TripComponent,
    AddTripComponent,
    NavbarComponent,
    CartComponent,
    TripDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RatingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryTripService),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddTripComponent]
})
export class AppModule { }
