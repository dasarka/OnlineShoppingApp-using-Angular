import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import * as firebase from 'firebase';
import { UserRole } from '../../models/user-roles';
import { AppUser } from '../../models/app-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name : user.displayName,
      email : user.email,
      photoUrl : user.photoURL
    });
  }

  getRoles(uid: string): Observable<{}> {
    return this.db.object('/roles/' + uid).valueChanges();
  }

  getUser(uid: string): Observable<{}> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
