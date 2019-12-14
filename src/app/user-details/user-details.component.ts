import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppUser } from '../models/user.model';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: AppUser

  constructor(private route: ActivatedRoute, private userService: UserService, private _location: Location) {
  }

  ngOnInit() {
    let id = this.route.params.subscribe(
      params => this.userService.getUser(params["id"]).subscribe(
        user => {
          console.log(user);
          this.user = user;
        },
        error => console.log(error)
      )
    )
  }

  goBack() {
    this._location.back();
  }


}
