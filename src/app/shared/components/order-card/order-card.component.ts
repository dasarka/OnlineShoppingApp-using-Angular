import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'shared/models/cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input('cartItems') cartItems: CartItem[];
  cart;
  constructor() { }

   ngOnInit() {
    this.cart = new ShoppingCart(this.cartItems);
   }

}
