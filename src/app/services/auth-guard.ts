import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { SecurityRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState$.pipe(map(state => {
      if (state != null) {
        if (this.authService.userRole)
          return true;
        else {
          this.authService.getUserRole(state.email).subscribe(
            role => {
              this.authService.setUserRole(role)
              return true;
            },
            err => {
              this.authService.setUserRole("USER")
              return true;
            }
          )
        }
      }
      this.router.navigate(['/login']);
      return false;
    }))
  }
}
