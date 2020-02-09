import { AppUser } from '../models/user.model';
import { of, Observable, throwError } from 'rxjs';

export interface Credentials {
    _id?: string;
    email: string;
    password: string;
}

export class AuthServiceMock {

    credentials: Credentials[] = []

    private isRegistered(cr: Credentials) {
        return this.credentials.find(cred => cr.email == cred.email)
    }

    private getNewUserId() {
        return "" + Math.round(Math.random() * 10)

    }

    login(cr: Credentials) {
        if (this.isRegistered(cr))
            return of(cr)

        else return throwError("User is not registered!")
    }

    register(cr: Credentials): Observable<firebase.auth.UserCredential> {
        if (this.isRegistered(cr))
            return throwError("User is already registered!")

        else {
            cr._id = this.getNewUserId()
            this.credentials.push(cr)
            return of({
                credential: null,
                user: null
            })
        }
    }

}