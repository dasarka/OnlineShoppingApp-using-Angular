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
  @Output('addToCart') addToCart;
  // ################## //
  cartItems;
  categories: Category[];
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private shoppingService: ShoppingService
  ) {
    // ################## //
    categoryService.getAll().pipe(take(1)).subscribe(c => {
      this.categories = c;
    });
   }
   ngOnInit() {
    this.readCartItems(this.productKey);
   }
  // ################## //
  readCartItems(productKey: string) {
    const items = this.shoppingService.getCart(productKey);
    this.cartItems = (items) ? items[0] : null;

  }
  addFavourite(productId: string) {
    this.wishList[productId] = !this.wishList[productId];
  }
  clickToAdd(productKey: string, product: Product) {
    this.shoppingService.addToCart(productKey, product);
    this.readCartItems(productKey);
    this.authService.user.subscribe(user => {
      if (user) {
        this.shoppingService.updateCart(user.uid);
      }
    });
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
    this.readCartItems(productKey);
    this.updateDatas();
  }

  decreaseQuantity(productKey) {
    this.shoppingService.updateCount(productKey, -1);
    this.readCartItems(productKey);
    this.updateDatas();
  }
}
