import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { UserService } from './user.service';
import { SecurityRole } from '../models/user.model';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  userRole: SecurityRole;
  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  constructor(private fireAuth: AngularFireAuth, private userService: UserService) { }

  login({ email, password }: Credentials) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(
      () => this.userService.getUserRole(email).subscribe(
        role => {
          this.userRole = role
        }
      )
    )
  }

  register({ email, password }: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }


}
