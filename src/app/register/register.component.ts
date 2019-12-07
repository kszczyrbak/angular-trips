import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    },
      this.mustMatch
    );
  }

  mustMatch(group: FormGroup) {
    let val = group.get('password').value;
    let matchVal = group.get('confirmPassword').value;

    return val === matchVal ? null : { notSame: true }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value)
  }

}
