import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { SpinnerOverlayService } from 'src/app/spinner/spinner-overlay.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTripComponent } from 'src/app/add-trip/add-trip.component';
import { photoPlaceholder } from 'src/assets/fake-dane';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.css']
})
export class AdminTripsComponent implements OnInit {

  trips: Trip[]

  constructor(private tripService: TripService, private spinnerService: SpinnerOverlayService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getTrips();
  }

  private getTrips() {
    this.spinnerService.show();
    this.tripService.getProducts().subscribe(trips => {
      this.trips = trips;
      this.spinnerService.hide();
    },
      err => {
        console.log(err)
        this.spinnerService.hide();
      });
  }

  delete(trip: Trip) {
    this.tripService.deleteProduct(trip).subscribe(
      response => this.getTrips(),
    )
  }

  edit(trip: Trip) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = trip

    const dialogRef = this.dialog.open(AddTripComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        data._id = trip._id
        this.tripService.editProduct(data).subscribe(
          data => {
            this.getTrips();
          },
          err => {
            console.log(err)
          })
      }
    })

  }


  addTrip() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddTripComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        // data._id = this.getMaxId();
        data.photo = photoPlaceholder;
        this.tripService.addProduct(data).subscribe(
          data => {
            this.getTrips();
            // this.toastr.success('Successfully added a trip!', 'Success!')
          },
          err => {
            console.log(err)
            // this.toastr.error('Error adding a trip', 'Oops!');
          })
      }
    })

  }
}
