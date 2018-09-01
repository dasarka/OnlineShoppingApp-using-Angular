import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { CheckOut } from 'shopping//models/check-out';
import { OrderService } from 'shopping//services/order/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order$: Observable<CheckOut>;
  orderId: string;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.orderId = params.get('orderId');
    this.order$ = await this.orderService.getOrder(this.orderId);
  }

}
