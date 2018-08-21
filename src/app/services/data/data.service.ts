import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,  AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UserRole } from '../../models/user-roles';
import { AppUser } from '../../models/app-users';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) {
  }

  getAll(path: string, orderby ?: string) {
    if (orderby !== undefined) {
      // Use snapshotChanges().map() to store the key
      return this.db.list(path, ref => ref.orderByChild(orderby)).snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
    } else {
      // Use snapshotChanges().map() to store the key
      return this.db.list(path).snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
    }
  }

  get(path: string): Observable<{}>  {
    return this.db.object(path).valueChanges();
  }

  update (path: string, key: string, body: any) {
    this.db.list(path).set(key, body);
  }

  create(path: string, body: any) {
    this.db.list(path).push(body);
  }

  remove(path: string, key: string) {
    return this.db.list(path).remove(key);
  }
}
