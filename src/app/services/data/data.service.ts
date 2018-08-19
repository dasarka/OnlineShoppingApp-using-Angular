import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,  AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UserRole } from '../../models/user-roles';
import { AppUser } from '../../models/app-users';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) {
  }

  get(path: string, orderby ?: string) {
    if (orderby !== undefined) {
      return this.db.list(path, ref => ref.orderByChild(orderby)).valueChanges();
    } else {
      return this.db.list(path).valueChanges();
    }
  }

  update (path: string, body: any) {
    this.db.list(path).update(body);
  }

  create(path: string, body: any) {
    console.log(path, body );
    this.db.list(path).push(body);
  }

  remove(path: string) {
    return this.db.list(path).remove();
  }
}
