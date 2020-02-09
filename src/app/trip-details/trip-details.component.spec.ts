import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsComponent } from './trip-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingModule } from 'ng-starrating';
import { TimeAgoPipe } from 'time-ago-pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerTestModule } from '../spinner/spinner.test.module';
import { MatDialogModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDetailsComponent, TimeAgoPipe ],
      imports: [
        NgbModule,
        RatingModule,
        RouterTestingModule,
        HttpClientModule,
        SpinnerTestModule,
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
