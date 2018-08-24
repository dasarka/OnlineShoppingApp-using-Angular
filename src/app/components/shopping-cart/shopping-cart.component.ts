import { Observable } from 'rxjs/Observable';
import { CartItem } from './../../models/cart-item';
import { element } from 'protractor';
import { AuthService } from './../../services/auth/auth.service';
import { take } from 'rxjs/operators';
import { ShoppingService } from './../../services/shopping/shopping.service';
import { Component, OnInit, AfterContentChecked} from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterContentChecked {

  cartItems$;
  // cartItemsCount = 0;
  totalPrice = 0;
  private userLoggedIn: boolean;
  private uid: string;
  constructor(
    private authService: AuthService,
    private shoppingService: ShoppingService
  ) {
    this.readCart();
  }

  ngOnInit() {}
  ngAfterContentChecked()  {
    this.totalPrice = 0;
    if (this.cartItems$ != null) {
      this.cartItems$.forEach(item => {
        this.totalPrice += item.price * item.count;
      });
    }
  }

  private readCart() {
    this.authService.user.subscribe(user => {
      if (!user) { this.userLoggedIn = false; }

      this.uid = user.uid;
      this.userLoggedIn = true;

      if (!this.userLoggedIn) {
        this.readFromLocal();
      } else {
        this.readFromDB();
      }
    });
  }

  // private countTotalCartItems() {
  //   this.cartItems$.forEach(item => {
  //     this.cartItemsCount += item.count;
  //   });
  // }

  private readFromLocal() {
    this.cartItems$ = this.shoppingService.getCartLocal();
  }

  private readFromDB() {
    this.shoppingService.getCartFromDB(this.uid).then(cartItems => {
        this.cartItems$ = cartItems;
    });
  }

  increaseQuantity(index, productKey) {
  //  this.cartItemsCount += 1;
   // this.cartItems$[index].count += 1;
    // ################# //
    if (!this.userLoggedIn) {
      this.shoppingService.updateCountLocal(productKey, 1);
    } else {
      this.shoppingService.updateCountFromDB(this.uid, productKey, 1);
    }
  }

  decreaseQuantity(index, productKey) {
  //  this.cartItemsCount -= 1;
   // this.cartItems$[index].count -= 1;
    // ################# //
    if (!this.userLoggedIn) {
      this.shoppingService.updateCountLocal(productKey, -1);
    } else {
      this.shoppingService.updateCountFromDB(this.uid, productKey, -1);
    }
  }

  clearShoppingCart() {
   // this.cartItemsCount = 0;
    this.cartItems$ = [];
    if (!this.userLoggedIn) {
      this.shoppingService.clearCartStorage();
    } else {
      this.shoppingService.clearCartFromDB(this.uid);
    }
  }
}
