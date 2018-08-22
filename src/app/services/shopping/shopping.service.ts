import { Observable } from 'rxjs/Observable';
import { Product } from './../../models/product';
import { AuthService } from './../auth/auth.service';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  addToCart(productKey: string, product: Product) {
    let cartItems = localStorage.getItem('cart-item');
    const itemsCount = localStorage.getItem('cart-item-count');
    localStorage.setItem('cart-item-count', (
      (itemsCount) ? (parseInt(itemsCount, 0) + 1).toString() : '1'));
    const cartItem = '-oShopCartItem-' + productKey +
      '-oShopCart-' +
      '1' +
      '-oShopCart-' +
      product.title +
      '-oShopCart-' +
      product.price +
      '-oShopCart-' +
      product.imgUrl;
    if (!cartItems) {
      localStorage.setItem('cart-item', cartItem);
    } else {
      if (cartItems.includes(productKey)) {
        const itemCountStr = cartItems.split(productKey)[1].split('-oShopCart-')[1];
        let itemCount: number = parseInt(itemCountStr, 0);
        cartItems = cartItems.replace((productKey + '-oShopCart-' + itemCountStr),
        (productKey + '-oShopCart-' + (++itemCount)));
        localStorage.setItem('cart-item', cartItems);
      } else {
        cartItems += cartItem;
        localStorage.setItem('cart-item', cartItems);
      }
    }
  }


  getCart(productKey ?: string) {
    const products = [];
    const cartItems = localStorage.getItem('cart-item');
    if (cartItems) {
      if (productKey === undefined) {
        const cartItem = cartItems.split('-oShopCartItem-');
        cartItem.forEach(element => {
          const item = element.split('-oShopCart-');
          if (item[0] !== '' ||
          item[1] !== undefined ||
            item[2] !== undefined ||
            item[3] !== undefined ||
            item[4] !== undefined) {
              // ################## //
            products.push({ key : item[0],
              count: item[1],
              title: item[2],
              price: item[3],
              imgUrl: item[4]});
          }
        });
      } else {
        if (!cartItems.includes(productKey)) {
          return null;
        }

        let cartItem = cartItems.split('-oShopCartItem-' + productKey)[1];
        cartItem = cartItem.split('-oShopCartItem-')[0];
        const item = cartItem.split('-oShopCart-');
        products.push({ key : item[0],
          count: item[1],
          title: item[2],
          price: item[3],
          imgUrl: item[4]});
      }
    }
    return products;
  }

  updateCount(productKey: string, count: number) {
    let cartItems = localStorage.getItem('cart-item');
    const itemsCount = localStorage.getItem('cart-item-count');
    localStorage.setItem('cart-item-count', (
      (itemsCount) ? (parseInt(itemsCount, 0) + count).toString() : '1'));
      if (cartItems.includes(productKey)) {
        const itemCountStr = cartItems.split(productKey)[1].split('-oShopCart-')[1];
        const itemCount: number = parseInt(itemCountStr, 0) + count;
        if (itemCount > 0) {
          cartItems = cartItems.replace((productKey + '-oShopCart-' + itemCountStr),
          (productKey + '-oShopCart-' + (itemCount)));
        } else {
          const itemsArr = cartItems.split('-oShopCartItem-' + productKey);
          const firstIndex  = itemsArr[1].indexOf('-oShopCartItem-', 1);
          itemsArr[1] = itemsArr[1].substr(firstIndex,  (itemsArr[1].length - firstIndex));
          cartItems = itemsArr[0] + itemsArr[1];
        }
        localStorage.setItem('cart-item', cartItems);
      }
  }

  updateCart(uid: string) {
    const cartItems = localStorage.getItem('cart-item');
    if (cartItems) {
      const products = {};
      const cartItem = cartItems.split('-oShopCartItem-');
      cartItem.forEach(element => {
        const item = element.split('-oShopCart-');
        if (item[0] !== '' ||
         item[1] !== undefined ||
          item[2] !== undefined ||
          item[3] !== undefined ||
           item[4] !== undefined) {
             // ################## //
          products[item[0]] = {count: item[1],
            title: item[2],
            price: item[3],
            imgUrl: item[4]};
        }
      });
      this.dataService.update('/shopping-cart' , uid, products);
    }
  }

}
