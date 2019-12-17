import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip.model';
import { Comment } from '../models/comment.model'
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTripComponent } from '../add-trip/add-trip.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { CommentService } from '../services/comment.service';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip

  comments: Comment[] = []

  hasOrdered: boolean = false;

  public isCommentsCollapsed = true;

  constructor(private route: ActivatedRoute, private tripService: TripService, private _location: Location, private dialog: MatDialog, private commentService: CommentService) {
  }

  ngOnInit() {
    let id = this.route.params.subscribe(
      params => this.tripService.getProduct(params["id"]).subscribe(
        trip => {
          console.log(trip);
          this.trip = trip;
          this.commentService.getCommentsByTrip(trip._id).subscribe(
            comments => {
              this.comments = comments
              console.log(this.comments)
            }
          )
        },
        error => console.log(error)
      )
    )
  }

  goBack() {
    this._location.back();
  }

  book() {
    this.trip.seatsLeft -= 1;
  }

  unbook() {
    this.trip.seatsLeft += 1;
  }

  comment() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.trip

    const dialogRef = this.dialog.open(AddCommentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined && data != "") {
        console.log(data)
        this.commentService.addComment(data, this.trip).subscribe(
          data => {

          },
          err => {
            console.log(err)
          })
      }
    })
  }

}
