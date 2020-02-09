import { Trip } from '../models/trip.model'
import { of, throwError } from 'rxjs'

export class TripServiceMock {
    trips: Trip[] = []

    private validateTrip(trip: Trip) {
        return trip.price > 0 && trip.seatsLeft <= trip.maxSeats && trip.maxSeats > 0 && trip.price > 0
    }

    private findObjById(_id: string) {
        return this.trips.find(trip => trip._id == _id)
    }

    getProducts() {
        return of(this.trips)
    }

    getProduct(_id: string) {
        return of(this.findObjById(_id))
    }

    addProduct(product: Trip) {
        if (this.validateTrip(product)) {
            this.trips.push(product)
            return of(product)
        }
        else return throwError("Wrong product data")
    }

    editProduct(product: Trip) {
        if (this.validateTrip(product)) {
            let obj = this.findObjById(product._id)
            let index = this.trips.indexOf(obj)
            this.trips[index] = product
            return of(product)
        }
        else return throwError("Wrong product data");
    }

    deleteProduct(product: Trip) {
        let obj = this.findObjById(product._id)
        let index = this.trips.indexOf(obj)
        console.log(`INDEX OF ${product._id} IS ${index}`)
        if (index > -1) {
            this.trips.splice(index, 1)
            return of("200 OK")
        }
        else {
            return throwError("This trip doesn't exist");
        }
    }
}