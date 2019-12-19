import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order[] = [];
  currentDate = new Date();

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders
    )
  }

  cancel(order: Order) {
    this.orderService.deleteOrder(order).subscribe(
      res => {
        console.log(res)
        this.getUserOrders(this.currentUser);
      }
    )
  }

}
