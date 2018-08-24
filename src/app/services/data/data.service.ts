import { Injectable } from '@angular/core';
// Firebase
import { AngularFireDatabase} from 'angularfire2/database';
// Observables
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // ################## //
  constructor(private db: AngularFireDatabase) {
  }
  // ################## //
  create(path: string, body: any) {
    this.db.list(path).push(body);
  }
  createObject(path: string, body: any) {
    this.db.object(path).update(body);
  }
  // ################## //
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
  // ################## //
  get(path: string): Observable<{}>  {
    return this.db.object(path).valueChanges();
  }
  // ################## //
  update (path: string, key: string, body: any) {
    this.db.list(path).set(key, body);
  }
  // ################## //
  remove(path: string, key: string) {
    return this.db.list(path).remove(key);
  }
}
