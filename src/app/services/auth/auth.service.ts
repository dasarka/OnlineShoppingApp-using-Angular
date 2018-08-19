'use strict';

import { UserRole } from './../../models/user-roles';
import { UserService } from './../user/user.service';

import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { AppUser } from '../../models/app-users';
import {switchMap} from 'rxjs/operators';
import 'rxjs/add/Observable/of';

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

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl !== null) {
      localStorage.setItem('returnUrl', returnUrl);
    } else {
      localStorage.setItem('returnUrl', '/');
    }

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

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

  get user() {
    return this.user$;
  }
}
