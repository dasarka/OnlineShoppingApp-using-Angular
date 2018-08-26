import { OrderService } from '../../services/order/order.service';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { Order } from '../../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  checkOutForm;
  constructor(
    fb: FormBuilder,
    private shoppingService: ShoppingService,
    private orderService: OrderService
  ) {
    this.checkOutForm = fb.group({
      name  : new FormControl('',
        Validators.required),
      address  : new FormControl('',
        [
          Validators.required
        ]),
      city : new FormControl('',
        Validators.required),
    });
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingService.getCartItems();
    // this.checkOutForm.setErrors({
    //   emptyCart : false
    // });
  }

  get name() {
    return this.checkOutForm.get('name');
  }
  get address() {
    return this.checkOutForm.get('address');
  }
  get city() {
    return this.checkOutForm.get('city');
  }

  placeOrder() {
    this.cart$.pipe(take(1)).subscribe(cart => {
    const orderDetails = new Order(cart.cartItems, this.checkOutForm.value);
      if ( orderDetails.isValidOrder) {
        this.orderService.createOrder(orderDetails.orderDetails);
      }
    });
  }

}
