import { Injectable } from '@angular/core';

import { of, throwError } from 'rxjs';

import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderServiceMock {
    orders: Order[] = []

    private validateOrder(order: Order) {
        return order.user_id && order.trip_id && order.count > 0 && order.totalPrice > 0
    }

    private findObjById(_id: string) {
        return this.orders.find(order => order._id == _id)
    }

    getUserOrders(user_id: string) {
        return of(this.orders.filter(order => order.user_id == user_id))
    }

    getOrders() {
        return of(this.orders)
    }

    deleteOrder(order: Order) {
        let obj = this.findObjById(order._id)
        let index = this.orders.indexOf(obj)
        console.log(`INDEX OF ${order._id} IS ${index}`)
        if (index > -1) {
            this.orders.splice(index, 1)
            return of("200 OK")
        }
        else {
            return throwError("This order doesn't exist");
        }
    }

    order(orders: Order[]) {
        let correctOrders = []
        for (let order of orders) {
            if (this.validateOrder(order)) {
                correctOrders.push(order)
            }
            else {
                return throwError("Wrong order data")
            }
        }
        this.orders = this.orders.concat(correctOrders)
        return of(correctOrders)
    }
}
