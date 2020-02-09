import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TripsComponent } from './trips.component';
import { FilterComponent } from '../filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from '../pipes/filter.pipe';
import { MatSidenavModule } from '@angular/material';
import { TripComponent } from './trip/trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingModule } from 'ng-starrating';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerTestModule } from '../spinner/spinner.test.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TripsComponent', () => {
  let component: TripsComponent;
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
