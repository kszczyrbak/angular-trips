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
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatSidenavModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPipe } from './pipes/filter.pipe';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { FiredbService } from './services/firedb.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerOverlayComponent } from './spinner/spinner-overlay/spinner-overlay.component';
import { AdminTripsComponent } from './admin/admin-trips/admin-trips.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFrameComponent } from './user-frame/user-frame.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { HistoryComponent } from './history/history.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadService } from './services/file-upload.service';
import { SpinnerTestModule } from './spinner/spinner.test.module';
import { AddTripTestModule } from './add-trip/add-trip.test.module';
import { AddCommentTestModule } from './add-comment/add-comment.test.module';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    CurrencyPipe,
    TripComponent,
    NavbarComponent,
    CartComponent,
    TripDetailsComponent,
    FilterComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddTripComponent,
    AdminComponent,
    AdminTripsComponent,
    AdminUsersComponent,
    UserDetailsComponent,
    UserFrameComponent,
    HistoryComponent,
    AdminOrdersComponent,
    TimeAgoPipe,
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
    NgbModule,
    NgxFileDropModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SpinnerTestModule,
    AddTripTestModule,
    AddCommentTestModule
  ],
  providers: [FiredbService, AuthService, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
