import { OrderService } from './../../services/order/order.service';
import { Observable } from 'rxjs/Observable';
import { MyOrders } from './../../models/my-orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<MyOrders>;
  constructor(private orderService: OrderService) {}

  async ngOnInit() {
      this.orders$ = await this.orderService.getAllOrder();
  }

}
