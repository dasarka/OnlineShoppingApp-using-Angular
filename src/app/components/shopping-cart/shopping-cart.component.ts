import { AuthService } from './../../services/auth/auth.service';
import { take } from 'rxjs/operators';
import { ShoppingService } from './../../services/shopping/shopping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems;
  cartItemsCount: string;
  constructor(
    private authService: AuthService,
    private shoppingService: ShoppingService
  ) {
    const itemsCount = localStorage.getItem('cart-item-count');
    this.cartItemsCount = (itemsCount) ? itemsCount : '0';
    this.readCartItems();
  }

  ngOnInit() {}

  private readCartItems() {
    this.cartItems = this.shoppingService.getCart();
  }

  private updateDatas() {
    this.authService.user.subscribe(user => {
      if (!user) {return; }
      // ################## //
      this.shoppingService.updateCart(user.uid);
    });
  }

  increaseQuantity(productKey) {
    this.shoppingService.updateCount(productKey, 1);
    this.readCartItems();
    this.updateDatas();
  }

  decreaseQuantity(productKey) {
    this.shoppingService.updateCount(productKey, -1);
    this.readCartItems();
    this.updateDatas();
  }
}
