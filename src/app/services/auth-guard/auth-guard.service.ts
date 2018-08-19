import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
