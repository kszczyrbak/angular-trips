import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTripsComponent } from './admin-trips.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SpinnerOverlayComponent } from 'src/app/spinner/spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { SpinnerTestModule } from 'src/app/spinner/spinner.test.module';

describe('AdminTripsComponent', () => {
  let component: AdminTripsComponent;
  let fixture: ComponentFixture<AdminTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTripsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        OverlayModule,
        MatDialogModule,
        SpinnerTestModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
