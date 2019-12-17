import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AppUser } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order.model';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  orders: Order[] = []
  currentUser: AppUser;
  currentDate = new Date();

  constructor(private authService: AuthService, private orderService: OrderService, private spinner: SpinnerOverlayService) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(
      user => {
        this.currentUser = user;
        this.getUserOrders(user);
      }
    )
  }

  private getUserOrders(user: AppUser) {
    this.spinner.show();
    this.orderService.getUserOrders(user._id).subscribe(orders => {
      console.log(orders);
      this.orders = orders;
      this.spinner.hide();
    },
      err => this.spinner.hide());
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
