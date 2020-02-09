import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from '../filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from '../pipes/filter.pipe';
import { MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingModule } from 'ng-starrating';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerTestModule } from '../spinner/spinner.test.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TripService } from '../services/trip.service';
import { Observable, of } from 'rxjs';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { TripsComponent } from '../trips/trips.component';
import { TripComponent } from '../trips/trip/trip.component';
import { SpinnerMock } from './spinner.mock';
import { TripServiceMock } from './trip-service.mock';
import { Trip } from '../models/trip.model';

let noTrips = []
let trips: Trip[] = [
  { _id: "0", name: 'Trip 1', country: 'Turcja', rating: 0, startDate: Date(), endDate: Date(), price: 210, maxSeats: 18, seatsLeft: 18, description: "Lorem ipsum", photos: [] },
  { _id: "1", name: 'Trip 2', country: 'Polska', rating: 2.8, startDate: Date(), endDate: Date(), price: 45, maxSeats: 11, seatsLeft: 11, description: 'Lorem ipsum ', photos: [] },
  { _id: "2", name: 'Trip 3', country: 'Tunezja', rating: 3.2, startDate: Date(), endDate: Date(), price: 210, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photos: [] },
  { _id: "3", name: 'Trip 4', country: 'Bułgaria', rating: 4.5, startDate: Date(), endDate: Date(), price: 900, maxSeats: 5, seatsLeft: 5, description: 'Lorem ipsum ', photos: [] },
  { _id: "4", name: 'Trip 5', country: 'Francja', rating: 0, startDate: Date(), endDate: Date(), price: 400, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photos: [] },
  { _id: "5", name: 'Trip 6', country: 'Turcja', rating: 0, startDate: Date(), endDate: Date(), price: 435, maxSeats: 35, seatsLeft: 35, description: 'Lorem ipsum ', photos: [] },
  { _id: "6", name: 'Trip 7', country: 'Hiszpania', rating: 5, startDate: Date(), endDate: Date(), price: 2560, maxSeats: 9, seatsLeft: 9, description: 'Lorem ipsum ', photos: [] },
  { _id: "7", name: 'Trip 8', country: 'Turcja', rating: 0, startDate: Date(), endDate: Date(), price: 210, maxSeats: 20, seatsLeft: 20, description: 'Lorem ipsum ', photos: [] },
  { _id: "8", name: 'Trip 9', country: 'Egipt', rating: 0, startDate: Date(), endDate: Date(), price: 890, maxSeats: 45, seatsLeft: 45, description: 'Lorem ipsum ', photos: [] },
  { _id: "9", name: 'Trip 10', country: 'Turcja', rating: 0, startDate: Date(), endDate: Date(), price: 210, maxSeats: 28, seatsLeft: 28, description: 'Lorem ipsum ', photos: [] }
]

describe('GetTripsIntegration', () => {
  let component: TripsComponent;
  let tripService: TripServiceMock;
  let fixture: ComponentFixture<TripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TripsComponent,
        FilterComponent,
        FilterPipe,
        TripComponent,
      ],
      imports: [
        FontAwesomeModule,
        MatSidenavModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        RatingModule,
        HttpClientModule,
        SpinnerTestModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: SpinnerOverlayService, useClass: SpinnerMock
        },
        {
          provide: TripService, useClass: TripServiceMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tripService = TestBed.get(TripService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tripService).toBeTruthy();
  });

  it('should get list of trips when trips exist', () => {
    tripService.trips = trips

    let tripSpy = spyOn(tripService, 'getProducts').and.callThrough()

    component.getTrips()
    expect(tripSpy).toHaveBeenCalled();
    expect(component.products).toEqual(trips)
  })

  it('should get empty list of trips when no trips exist', () => {
    tripService.trips = []

    let tripSpy = spyOn(tripService, 'getProducts').and.callThrough()

    component.getTrips()
    expect(tripSpy).toHaveBeenCalled();
    expect(component.products).toEqual(noTrips)
  })
});
