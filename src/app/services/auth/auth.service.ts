import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Services
import { UserService } from '../user/user.service';
// Models
import { UserRole } from '../../models/user-roles';
import { AppUser } from '../../models/app-users';
// Database
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
// Operators
import { Observable } from 'rxjs/Observable';
import {switchMap} from 'rxjs/operators';
import 'rxjs/add/Observable/of';

/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: Observable<firebase.User>;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
     this.user$ = afAuth.authState;
   }
   // ********************************************************************************************** //
   // Login
   // ********************************************************************************************** //
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl !== null) {
      localStorage.setItem('returnUrl', returnUrl);
    } else {
      localStorage.setItem('returnUrl', '/');
    }

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }
  // ********************************************************************************************** //
  // Logout
  // ********************************************************************************************** //
  logout() {
    localStorage.removeItem('userId');
    this.afAuth.auth.signOut();
  }
  // ********************************************************************************************** //
  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUser(user.uid);
        }

        return Observable.of(null);
      })
    );
  }
  // ********************************************************************************************** //
  get userRole$(): Observable<UserRole> {
    return this.user$
    .pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getRoles(user.uid);
        }

        return Observable.of(null);
      })
    );
  }
  // ********************************************************************************************** //
  get user() {
    return this.user$;
  }
}
