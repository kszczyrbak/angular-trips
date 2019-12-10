import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

  constructor(private fireAuth: AngularFireAuth, private userService: UserService) {
  }

  setUserRole(role: string) {
    switch (role) {
      case "ADMIN": {
        this.userRole = SecurityRole.ADMIN;
        break;
      }
      default: {
        this.userRole = SecurityRole.USER;
        break;
      }
    }
  }

  getUserRole(email: string) {
    return this.userService.getUserRole(email)
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
