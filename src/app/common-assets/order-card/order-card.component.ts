import { CartItem } from './../../models/cart-item';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

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
