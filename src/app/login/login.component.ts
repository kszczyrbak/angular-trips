import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerOverlayService,
  ) {
    if (this.authService.user) {
      this.router.navigate(['/app']);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.spinnerService.show();
    this.authService.login(this.loginForm.value)
      .then((credentials) => {
        this.authService.getUserRole(credentials.user.email).subscribe(
          role => {
            this.authService.setUserRole(role)
            this.spinnerService.hide();
            this.router.navigateByUrl('/app');
          }
        )
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
