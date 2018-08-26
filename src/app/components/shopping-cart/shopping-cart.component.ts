import { Observable } from 'rxjs/Observable';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { Component, OnInit} from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  cartItemsCount$: String;
  pricePerRow: number[];
  totalPrice = 0;
  constructor(
    private shoppingService: ShoppingService
  ) {
  }


  async ngOnInit() {
    this.cart$ = await this.shoppingService.getCartItems();
  }



 // ################## //
 private async readCartAnnoymousUser() {
   if (!localStorage.getItem('userId')) {
    this.cart$ = await this.shoppingService.getCartItems();
   }
}


  updateQuantity() {
    this.readCartAnnoymousUser();
  }
  async clearShoppingCart() {
    await this.shoppingService.clearCart();
    await this.readCartAnnoymousUser();
  }
}
