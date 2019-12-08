import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AppComponent } from './app.component';
import { CurrencyPipe } from './pipes/currency/currency.pipe';
import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trips/trip/trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDrawer, MatDrawerContent, MatSidenavModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTripService } from './services/inmemorytrip.service';
import { HttpClientModule } from '@angular/common/http';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPipe } from './pipes/filter.pipe';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { FiredbService } from './services/firedb.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TripService } from './services/trip.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    CurrencyPipe,
    TripComponent,
    AddTripComponent,
    NavbarComponent,
    CartComponent,
    TripDetailsComponent,
    FilterComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
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
    MatSidenavModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryTripService),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [FiredbService],
  bootstrap: [AppComponent],
  entryComponents: [AddTripComponent]
})
export class AppModule { }
