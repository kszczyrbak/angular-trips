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

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.spinnerService.show();
    this.authService.login(this.loginForm.value)
      .subscribe(
        (credentials) => {
          this.spinnerService.hide();
          this.router.navigateByUrl('/app');
        },
        error => {
          console.log(error);
        })

  }
}
