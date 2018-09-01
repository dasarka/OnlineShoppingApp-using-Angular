import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingService } from 'shared/services/shopping/shopping.service';
import { OrderService } from 'shopping/services/order/order.service';
import { Order } from 'shopping/models/order';
import { AuthService } from 'shared/services/auth/auth.service';
import { AppUser } from 'shared/models/app-users';




@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  checkOutForm;
  private appUser: AppUser;
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
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
    this.authService.appUser$.pipe(take(1)).subscribe(user => {
      this.appUser = user;
    });
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
    const orderDetails = new Order(cart.cartItems, this.checkOutForm.value, this.appUser.name);
      if ( orderDetails.isValidOrder) {
        this.orderService.createOrder(orderDetails.orderDetails);
      }
    });
  }

}
