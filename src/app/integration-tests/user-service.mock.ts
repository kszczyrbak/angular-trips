import { AppUser, SecurityRole } from '../models/user.model';
import { Observable, of, throwError } from 'rxjs';

export class UserServiceMock {

    users: AppUser[] = []

    private validateUserData(user: AppUser) {
        console.log("VALIDATING USER", user)
        return user.email && user.name
    }

    getUsers(): Observable<AppUser[]> {
        return of(this.users)
    }

    getUser(id: string): Observable<AppUser> {
        return of(this.users.find(user => user._id == id))
    }

    addUser(user: AppUser): Observable<AppUser> {
        if (this.validateUserData(user)) {
            user._id = "434234"
            this.users.push(user)
            console.log(`USER ${user.name} is correct`)
            return of(user)
        }
        else throwError("User data is wrong")
    }

}