import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { SpinnerOverlayService } from 'src/app/spinner/spinner-overlay.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTripComponent } from 'src/app/add-trip/add-trip.component';
import { photoPlaceholder } from 'src/assets/fake-dane';
import { DatePipe } from '@angular/common';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.css']
})
export class AdminTripsComponent implements OnInit {

  trips: Trip[]

  constructor(private tripService: TripService, private spinnerService: SpinnerOverlayService, private dialog: MatDialog, private fileUpload: FileUploadService) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
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
      response => {
        this.getTrips();
      },
      err => {
        console.log(err);
      }
    )
  }

  edit(trip: Trip) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = trip

    const dialogRef = this.dialog.open(AddTripComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        data._id = trip._id
        this.tripService.editProduct(data).subscribe(
          data => {
            if (data.photos.length > 0)
              this.fileUpload.upload(trip._id)

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
    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(AddTripComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.tripService.addProduct(data).subscribe(
          data => {
            let filenames = this.fileUpload.upload(data._id)

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
