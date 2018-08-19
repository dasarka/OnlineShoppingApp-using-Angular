import { UserRole} from './../../models/user-roles';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }
  canActivate(): Observable<boolean> {
    return this.authService.userRole$
    .pipe(
      map(userRole => userRole.admin)
    );
  }
}
