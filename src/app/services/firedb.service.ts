import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Trip } from '../models/trip.model';
import { trips } from 'src/assets/fake-dane';

@Injectable({
  providedIn: 'root'
})
export class FiredbService {

  trips;

  constructor(private db: AngularFireDatabase) {
    this.trips = this.db.list('/trips/trips/');
    console.dir(this.trips);
  }

  fetchTrips() {
    return this.db.list('/trips/trips/').valueChanges();
  }

  deleteTrips() {
    return this.trips.remove();
  }

  addTrip(product: Trip) {
    return this.db.object(`/trips/trips/${product._id}`).set(product)
  }

  deleteTripById(tripId: string) {
    this.db.object(`/trips/trips/${tripId}`).remove();
  }

}
