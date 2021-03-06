import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AppUser } from '../models/user.model';
import { map } from 'rxjs/operators'
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private spinner: SpinnerOverlayService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    },
      this.mustMatch
    );
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get name() {
    return this.registerForm.get('name')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  mustMatch(group: FormGroup) {
    let val = group.get('password').value;
    let matchVal = group.get('confirmPassword').value;

    return val === matchVal ? null : { notSame: true }
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.spinner.show();
    this.authService.register({ email: this.f.email.value, password: this.f.password.value }).subscribe(
      data => {
        console.log("Adding user")
        let { password, confirmPassword, ...userData } = this.registerForm.value;
        userData.role = "USER";
        this.userService.addUser(userData).subscribe(
          data => {
            this.spinner.hide();
            this.router.navigateByUrl('/app')
            console.log("ADDED USER", data)
          },
          err => {
            console.log(err)
            this.spinner.hide();
          }
        )

      },
      err => {
        console.log(err)
      }
    )
  }

}
