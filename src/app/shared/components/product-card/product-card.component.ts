
import { Component, Input, OnInit } from '@angular/core';

// Observables
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category/category.service';
import { ShoppingService } from 'shared/services/shopping/shopping.service';

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
  qSuffix = 'in cart';
  constructor(
    categoryService: CategoryService,
    private shoppingService: ShoppingService
  ) {
    // ################## //
    categoryService.getAll().pipe(take(1)).subscribe(c => {
      this.categories = c;
    });
   }
  async ngOnInit() {
    this.cartItemCount$ = await this.shoppingService.getItemCount(this.productKey);
  }
  // ################## //
  private async readItemCountAnnoymousUser() {
    if (!localStorage.getItem('userId')) {
      this.cartItemCount$ = await this.shoppingService.getItemCount(this.productKey);
    }
 }
 updateQuantity() {
  this.readItemCountAnnoymousUser();
}

  addFavourite(productId: string) {
    this.wishList[productId] = !this.wishList[productId];
  }
  // ################# //
  async clickToAdd(productKey: string, product: Product) {
    await this.shoppingService.addToCart(productKey, product);
    await this.readItemCountAnnoymousUser();
  }
}
