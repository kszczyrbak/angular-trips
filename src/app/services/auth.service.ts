import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  constructor(private fireAuth: AngularFireAuth) { }

  login({ email, password }: Credentials) {
    console.log(email, password)
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register({ email, password }: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }


}
