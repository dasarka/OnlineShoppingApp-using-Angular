import { Component, OnInit } from '@angular/core';
import { ManageOrder } from 'admin/models/manage-order';
import { Observable } from 'rxjs';

import { ManageOrdersService } from './../../services/manage-orders/manage-orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  orders$: Observable<ManageOrder[]>;
  constructor(private manageOrderService: ManageOrdersService) { }

  async ngOnInit() {
    this.orders$ = await this.manageOrderService.getAllOrder();
  }

}
