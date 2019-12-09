import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SecurityRole } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount: number = 0;
  userRole: SecurityRole;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartCount$.subscribe(
      count => this.cartCount = count
    )
  }

  logout() {
    this.authService.logout().then(
      (message) => {
        console.log(message);
        this.router.navigateByUrl('login')
      }
    )
  }
}
