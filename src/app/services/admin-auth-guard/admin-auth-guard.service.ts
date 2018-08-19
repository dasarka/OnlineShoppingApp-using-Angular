import { UserRoles } from './../../models/user-roles';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }
  canActivate(): Observable<boolean> {
    return this.authService.userRoles$
    .pipe(
      map(userRoles => userRoles.admin)
    );
  }
}
