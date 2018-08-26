// ********************************************************************************************** //
// Guard Service
// ********************************************************************************************** //
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }
  // ********************************************************************************************** //
  canActivate(): Observable<boolean> {
    return this.authService.userRole$
    .pipe(
      map(userRole => userRole.admin)
    );
  }
}
