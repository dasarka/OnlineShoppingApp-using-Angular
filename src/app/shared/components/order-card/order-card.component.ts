import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CartItem } from 'shared/models/cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit, OnChanges {
  @Input('cartItems') cartItems: CartItem[];
  cart;
  constructor() { }

   ngOnInit() {
     if (this.cartItems.length > 0) {
        this.cart = new ShoppingCart(this.cartItems);
     }
   }

   ngOnChanges() {
     if (this.cartItems.length > 0) {
        this.cart = new ShoppingCart(this.cartItems);
     }

   }

}
