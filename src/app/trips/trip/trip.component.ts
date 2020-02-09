import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @Input() tripData: Trip
  @Output() removeEvent = new EventEmitter<Trip>()

  mainPhotoUrl: string;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (this.tripData) {
      this.mainPhotoUrl = `${environment.backendUrl}/${this.tripData.photos[0]}`
      console.log(this.mainPhotoUrl)
    }
  }

  placeholder($event) {
    this.mainPhotoUrl = "assets/placeholder.jpg"
  }

  removeProduct() {
    this.removeEvent.emit(this.tripData)
  }


  book() {
    if (this.tripData.seatsLeft > 0) {
      this.cartService.addProduct(this.tripData)
      this.tripData.seatsLeft -= 1
    }
  }

  unbook() {
    if (this.tripData.seatsLeft < this.tripData.maxSeats) {
      this.cartService.unbookProduct(this.tripData)
      this.tripData.seatsLeft += 1
    }
  }

  onRate($event: { oldValue: number, newValue: number }) {
    this.tripData.rating = $event.newValue;
  }


}

