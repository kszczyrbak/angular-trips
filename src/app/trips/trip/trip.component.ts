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

  photo: string;

  constructor(private cartService: CartService) { }

  // TODO: resolver

  ngOnInit() {
    if (this.tripData) {
      this.photo = this.tripData.photos.length > 0 ? this.tripData.photos[0] : this.getPlaceholderUrl()
    }
  }

  removeProduct() {
    this.removeEvent.emit(this.tripData)
  }

  getPlaceholderUrl() {
    return "../../../assets/placeholder.jpg"
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

