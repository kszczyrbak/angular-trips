import { Component, OnInit } from '@angular/core';
import { AppUser, SecurityRole } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SpinnerOverlayService } from 'src/app/spinner/spinner-overlay.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: AppUser[]

  constructor(private userService: UserService, private spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.spinnerService.show();
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.spinnerService.hide();
    }, err => {
      console.log(err);
      this.spinnerService.hide();
    });
  }

  isAdmin(user: AppUser) {
    return (user.role == SecurityRole.ADMIN)
  }

  delete(user: AppUser) {
    this.userService.deleteUser(user).subscribe(
      response => this.getUsers()
    )
  }

  edit(user: AppUser) {

  }

}
