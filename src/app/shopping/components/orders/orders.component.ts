import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MyOrders } from '../../models/my-orders';
import { OrderService } from '../../services/order/order.service';



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
