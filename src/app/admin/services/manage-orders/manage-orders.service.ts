import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ManageOrder } from 'admin/models/manage-order';
import { DataService } from 'database/services/data/data.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageOrdersService {

constructor(
  private router: Router,
  private dataService: DataService
) { }

private async getUserId() {
  return localStorage.getItem('userId');
}

async getAllOrder(): Promise<Observable<ManageOrder[]>> {
  const uid = await this.getUserId();
  return this.dataService.getAll('/order-details/').pipe(
    switchMap(orders => {
      if (orders) {
        return Observable.of(orders);
      }

      return Observable.of(null);
    })
  );
}
}
