// ********************************************************************************************** //
// Guard Service
// ********************************************************************************************** //
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {map} from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  // ********************************************************************************************** //
  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.appUser$
    .pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/'], { queryParams : {returnUrl: state.url}});
          return false;
        }
      })
    );
  }
}
