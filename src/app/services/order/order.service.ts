import { MyOrders } from '../../models/my-orders';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { CheckOut } from '../../models/check-out';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  private async getUserId() {
    return localStorage.getItem('userId');
  }
  private async clearShoppingCart() {
    const uid = await this.getUserId();
    this.dataService.remove('/shopping-cart/' , uid);
  }
  private async placeOrder( body: CheckOut) {
    const uid = await this.getUserId();
    this.dataService.create('/order-details/' + uid, body);

  }

  async createOrder(order: CheckOut) {
    await this.placeOrder(order);
    await this.clearShoppingCart();
    this.router.navigate(['/check-out/success']);
  }

  async getAllOrder(): Promise<Observable<MyOrders>> {
    const uid = await this.getUserId();
    return this.dataService.getAll('/order-details/' + uid).pipe(
      switchMap(orders => {
        if (orders) {
          return Observable.of(new MyOrders(orders));
        }

        return Observable.of(new MyOrders([]));
      })
    );
  }

 async getOrder(orderId: string): Promise<Observable<CheckOut>> {
    const uid = await this.getUserId();
    return this.dataService.get('/order-details/' + uid + '/' + orderId).pipe(
      switchMap(order => {
        if (order) {
          return Observable.of(order);
        }

        return Observable.of(null);
      })
    );
  }
}
