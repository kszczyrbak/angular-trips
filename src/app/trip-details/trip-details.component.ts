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
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { CartService } from '../services/cart.service';
import { AppUser } from '../models/user.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip

  comments: Comment[] = []
  user: AppUser;

  photos: String[]

  hasOrdered: boolean = false;

  public isCommentsCollapsed = true;

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private tripService: TripService,
    private _location: Location,
    private dialog: MatDialog,
    private commentService: CommentService,
    private orderService: OrderService,
    private authService: AuthService,
    private spinner: SpinnerOverlayService) {
  }

  placeholder($event) {
    this.photos = ["assets/placeholder.jpg"]
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.getTripData(params);
        this.getUserOrderStatus();
      }
    )
  }

  private getUserOrderStatus() {
    this.authService.getCurrentUser().then(user => {
      this.user = user;
      this.orderService.getUserOrders(user._id).subscribe(orders => this.hasOrdered = orders.some(order => order.trip_id = this.trip._id))
    }
    )
  }

  private getTripData(params) {
    this.spinner.show();
    this.tripService.getProduct(params["id"]).subscribe(trip => {
      console.log(trip);
      this.trip = trip;
      this.photos = trip.photos.map(photo => `${environment.backendUrl}/${photo}`)
      this.spinner.hide();
      this.getComments(trip);
    }, error => console.log(error));
  }

  private getComments(trip: Trip) {
    this.spinner.show();
    this.commentService.getCommentsByTrip(trip._id).subscribe(comments => {
      this.comments = comments;
      console.log(this.comments);
      this.spinner.hide();
    });
  }

  goBack() {
    this._location.back();
  }

  book() {
    if (this.trip.seatsLeft > 0) {
      this.cartService.addProduct(this.trip)
      this.trip.seatsLeft -= 1
    }
  }

  unbook() {
    if (this.trip.seatsLeft < this.trip.maxSeats) {
      this.cartService.unbookProduct(this.trip)
      this.trip.seatsLeft += 1
    }
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
            this.getComments(this.trip)
          },
          err => {
            console.log(err)
          })
      }
    })
  }

}
