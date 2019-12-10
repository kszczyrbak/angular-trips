import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { UserService } from './user.service';
import { SecurityRole } from '../models/user.model';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { Router } from '@angular/router';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  private userRole: SecurityRole = null;

  getUserRole(): Promise<SecurityRole> {
    // this.spinnerService.show()
    if (!this.userRole) {
      return this.userService.getUserRole(this.user.email).toPromise()
    }
    else {
      return Promise.resolve(this.userRole)
    }
  }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  constructor(private fireAuth: AngularFireAuth, private userService: UserService, private spinnerService: SpinnerOverlayService, private router: Router) {
  }

  private authenticate() {

    return this.userService.getUserRole(this.user.email)
  }

  login({ email, password }: Credentials) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  register({ email, password }: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }


}
