import { CartItem } from 'shared/models/cart-item';
import { AllOrders } from './../../models/all-order';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal , NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';

import { ManageOrdersService } from './../../services/manage-orders/manage-orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  closeResult: string;
  orders$: Observable<AllOrders>;
  items: CartItem[];
  constructor(
    private modalService: NgbModal,
    private manageOrderService: ManageOrdersService
  ) {
   }

  async ngOnInit() {
    this.orders$ = await this.manageOrderService.getAllOrder();
  }

  open(content) {
    this.items = content;
    // this.modalService.open();
  }


}
