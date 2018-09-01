import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

// Firebase
// Observables
/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private db: AngularFireDatabase) {
  }
  // ********************************************************************************************** //
  // Create Body as List in firebase
  // ********************************************************************************************** //
  create(path: string, body: any) {
    this.db.list(path).push(body);
  }
  // ********************************************************************************************** //
  // Create Body as Object in firebase
  // ********************************************************************************************** //
  createObject(path: string, body: any) {
    this.db.object(path).update(body);
  }
  // ********************************************************************************************** //
  // Get Complete List from firebase
  // ********************************************************************************************** //
  getAll(path: string, orderby ?: string) {
    if (orderby !== undefined) {
      return this.db.list(path, ref => ref.orderByChild(orderby)).snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
    } else {
      return this.db.list(path).snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
    }
  }
  // ********************************************************************************************** //
  // Get requested List based on list id from firebase
  // ********************************************************************************************** //
  get(path: string): Observable<{}>  {
    return this.db.object(path).valueChanges();
  }
  // ********************************************************************************************** //
  // update complete requested list based on list id in firebase
  // ********************************************************************************************** //
  update (path: string, key: string, body: any) {
    this.db.list(path).set(key, body);
  }
  // ********************************************************************************************** //
  // remove requested list from firebase
  // ********************************************************************************************** //
  remove(path: string, key: string) {
    return this.db.list(path).remove(key);
  }
}
