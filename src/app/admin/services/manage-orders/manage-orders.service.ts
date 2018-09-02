import { AllOrders } from './../../models/all-order';
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
  private dataService: DataService
) { }

async getAllOrder(): Promise<Observable<AllOrders>> {
  return this.dataService.getAll('/order-details/').pipe(
    switchMap(orders => {
      if (orders) {
        return Observable.of( new AllOrders(orders));
      }

      return Observable.of(new AllOrders([]));
    })
  );
}
}
