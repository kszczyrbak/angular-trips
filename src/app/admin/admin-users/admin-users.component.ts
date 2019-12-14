import { Component, OnInit } from '@angular/core';
import { User, SecurityRole } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SpinnerOverlayService } from 'src/app/spinner/spinner-overlay.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: User[]

  constructor(private userService: UserService, private spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.userService.getUsers().subscribe(
      users => {
        this.users = users
        this.spinnerService.hide();
      }

    )
  }

  isAdmin(user: User) {
    return (user.role == SecurityRole.ADMIN)
  }

}
