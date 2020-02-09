import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersComponent } from './admin-users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { SpinnerOverlayComponent } from 'src/app/spinner/spinner-overlay/spinner-overlay.component';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { SpinnerTestModule } from 'src/app/spinner/spinner.test.module';

describe('AdminUsersComponent', () => {
  let component: AdminUsersComponent;
  let fixture: ComponentFixture<AdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        OverlayModule,
        SpinnerTestModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
