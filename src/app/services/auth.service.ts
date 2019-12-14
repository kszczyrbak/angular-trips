import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { UserService } from './user.service';
import { SecurityRole, AppUser } from '../models/user.model';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  private appUser: AppUser = null;

  getUserRole(): Promise<SecurityRole> {
    if (!this.appUser) {
      return this.userService.getUserByEmail(this.user.email).pipe(map(user => user.role)).toPromise()
    }
    else {
      return Promise.resolve(this.appUser.role)
    }
  }

  getCurrentUser(): Promise<AppUser> {
    if (!this.appUser) {
      return this.userService.getUserByEmail(this.user.email).toPromise()
    }
    else {
      return Promise.resolve(this.appUser)
    }
  }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  constructor(private fireAuth: AngularFireAuth, private userService: UserService, private spinnerService: SpinnerOverlayService, private router: Router) {
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
