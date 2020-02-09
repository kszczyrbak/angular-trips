import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule, MatDialog } from '@angular/material';
import { SpinnerTestModule } from 'src/app/spinner/spinner.test.module';
import { AdminTripsComponent } from '../admin/admin-trips/admin-trips.component';
import { TripService } from '../services/trip.service';
import { of } from 'rxjs';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { Trip } from '../models/trip.model';
import { SpinnerMock } from './spinner.mock';
import { TripServiceMock } from './trip-service.mock';
import { FileUploadService } from '../services/file-upload.service';
import { incorrectTrip, correctTrip } from './test-data';

export class AddTripDialogMock {
    tripFromForm: Trip

    open() {
        return {
            afterClosed: () => of(this.tripFromForm)
        };
    }
};

describe('AdminTripIntegration', () => {
    let component: AdminTripsComponent;
    let fixture: ComponentFixture<AdminTripsComponent>;
    let tripService: TripServiceMock
    let dialog: AddTripDialogMock
    let fileService: FileUploadService
    let viewRefreshSpy: jasmine.Spy

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminTripsComponent],
            imports: [
                RouterTestingModule,
                HttpClientModule,
                OverlayModule,
                MatDialogModule,
                SpinnerTestModule,
            ],
            providers: [
                {
                    provide: MatDialog, useClass: AddTripDialogMock,
                },
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
        fixture = TestBed.createComponent(AdminTripsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        tripService = TestBed.get(TripService)
        dialog = TestBed.get(MatDialog)
        fileService = TestBed.get(FileUploadService)
        viewRefreshSpy = spyOn(tripService, 'getProducts').and.callThrough()

    });

    it('should fail when trip data is not correct', () => {
        dialog.tripFromForm = incorrectTrip as any

        let trips = [...tripService.trips] // save current trips



        component.addTrip()
        expect(viewRefreshSpy).not.toHaveBeenCalled() // refresh wasn't called
        expect(component.trips).toEqual(trips) // nothing changed
    })

    it('should add trip correctly', () => {
        let spyAddProduct = spyOn(tripService, 'addProduct').and.callThrough()

        dialog.tripFromForm = correctTrip
        console.log(tripService.trips)

        let trips = [...tripService.trips] // save current trips
        component.addTrip() // add a trip
        expect(spyAddProduct).toHaveBeenCalled() // trip service was called
        expect(viewRefreshSpy).toHaveBeenCalled() // trip view was refreshed
        expect(component.trips).toEqual([...trips, correctTrip]) //trips include the new trip
    })

    it('should edit trip correctly', () => {
        tripService.trips = [correctTrip]
        component.trips = [correctTrip] // put trip in database and component

        let editedTrip = {
            ...correctTrip,
            leftSeats: 14,
            description: "ChangedDescription"
        }

        dialog.tripFromForm = editedTrip // put edited data of trip in form

        component.edit(correctTrip) // call edit function

        let fileUploadBlock = spyOn(fileService, 'upload').and.stub()

        expect(viewRefreshSpy).toHaveBeenCalled() // check if view was refreshed
        expect(component.trips).toEqual([editedTrip]) // view has the new edited trip
    })

    it("should fail when updated trip data isn't correct", () => {
        tripService.trips = [correctTrip]
        component.trips = [correctTrip] // put trip in database and component

        dialog.tripFromForm = incorrectTrip // put edited data of trip in form

        component.edit(correctTrip) // call edit function

        let fileUploadBlock = spyOn(fileService, 'upload').and.stub()

        expect(viewRefreshSpy).not.toHaveBeenCalled() // check if view was refreshed
        expect(component.trips).toEqual([correctTrip]) // view has the new edited trip
    })

    it("should delete trip correctly", () => {
        tripService.trips = [correctTrip]
        component.trips = [correctTrip] // put trip in database and component

        component.delete(correctTrip)

        expect(viewRefreshSpy).toHaveBeenCalled()
        expect(component.trips).toEqual([])
    })

    it("should fail when trip doesn't delete properly", () => {
        tripService.trips = [correctTrip]
        component.trips = [correctTrip] // put trip in database and component

        let imaginaryTrip = {
            ...correctTrip,
            _id: "4142"
        }

        component.delete(imaginaryTrip)

        expect(viewRefreshSpy).not.toHaveBeenCalled()
        expect(component.trips).toEqual([correctTrip])
    })
});
