import { Injectable } from '@angular/core';
import { Currency, Trip } from '../models/trip.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Comment } from '../models/comment.model'
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = `${environment.backendUrl}/orders`

    constructor(private httpClient: HttpClient) { }


    getUserOrders(user_id: string) {
        return this.httpClient.get<Order[]>(`${this.apiUrl}/user/${user_id}`);
    }

    deleteOrder(order: Order) {
        let _id = order._id;
        return this.httpClient.delete(`${this.apiUrl}/${_id}`);
    }

    order(orders: Order[]) {
        return this.httpClient.post(this.apiUrl, orders)
    }
}
