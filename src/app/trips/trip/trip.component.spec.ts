import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingModule } from 'ng-starrating';
import { HttpClientModule } from '@angular/common/http';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripComponent ],
      imports: [
        RouterTestingModule,
        RatingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
