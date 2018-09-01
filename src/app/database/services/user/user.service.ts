import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

// Database
// Opeartors
/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }
  // ********************************************************************************************** //
  // Save user in firebase
  // ********************************************************************************************** //
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name : user.displayName,
      email : user.email,
      photoUrl : user.photoURL
    });
  }
  // ********************************************************************************************** //
  // get user role from firebase
  // ********************************************************************************************** //
  getRoles(uid: string): Observable<{}> {
    return this.db.object('/roles/' + uid).valueChanges();
  }
  // ********************************************************************************************** //
  // get user details from firebase
  // ********************************************************************************************** //
  getUser(uid: string): Observable<{}> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
