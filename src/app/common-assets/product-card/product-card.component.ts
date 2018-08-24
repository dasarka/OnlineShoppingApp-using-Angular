import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../services/auth/auth.service';
import { ShoppingService } from './../../services/shopping/shopping.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// Services
import { CategoryService } from './../../services/category/category.service';
// Models
import { Category } from '../../models/category';
import { Product } from '../../models/product';
// Observables
import { take } from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  // ################## //
  @Input('product') product: Product;
  @Input('isFavourite') isFavourite: boolean;
  @Input('hideBorder') hideBorder: boolean;
  @Input('addCart') addCart: boolean;
  @Input('wishList') wishList: {};
  @Input('productKey') productKey;
  // ################## //
  cartItemCount$;
  categories: Category[];
  private userLoggedIn: boolean;
  private uid: string;
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private shoppingService: ShoppingService
  ) {
    // ################## //
    categoryService.getAll().pipe(take(1)).subscribe(c => {
      this.categories = c;
      this.readCart();
    });
   }
   ngOnInit() { }
  // ################## //
  addFavourite(productId: string) {
    this.wishList[productId] = !this.wishList[productId];
  }
  private readCart() {
    this.authService.user.subscribe(user => {
      if (!user) { this.userLoggedIn = false; }

      this.uid = user.uid;
      this.userLoggedIn = true;

      if (!this.userLoggedIn) {
        // get single item from local
        const item = this.shoppingService.getCartLocal(this.productKey);
       // this.cartItemCount = (item === null) ? 0 : item[0]['count'];
      } else {
        // get single item from db
        this.shoppingService.getItemCountFromDB(this.uid, this.productKey).then(item => {
          this.cartItemCount$ = item;
        });
      }
    });
  }
  // ################# //
  clickToAdd(productKey: string, product: Product) {
    // this.cartItemCount$ += 1;
    if (!this.userLoggedIn) {
        this.shoppingService.addToCartLocal(productKey, product);
      } else {
        this.shoppingService.addToCartDB(this.uid, productKey, product);
      }
  }
  // ################# //
  increaseQuantity(productKey) {
    // this.cartItemCount$ += 1;
    // ################# //
    if (!this.userLoggedIn) {
      this.shoppingService.updateCountLocal(productKey, 1);
    } else {
      this.shoppingService.updateCountFromDB(this.uid, productKey, 1);
    }
  }
  // ################# //
  decreaseQuantity(productKey) {
    // this.cartItemCount$ -= 1;
    // ################# //
    if (!this.userLoggedIn) {
      this.shoppingService.updateCountLocal(productKey, -1);
    } else {
      this.shoppingService.updateCountFromDB(this.uid, productKey, -1);
    }
  }
}
