import { async } from '@angular/core/testing';
import { CartItem } from './../../models/cart-item';
import { take, switchMap } from 'rxjs/operators';
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

  // storeCart for anonymousUser in localstorage
  private storeCart(productKey: string, product: Product) {
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

  // retrieve from localstorage once logged in
  private retriveCompleteCart(dbCartItems) {
    const cartItems = localStorage.getItem('cart-item');
    const products =  {};
    if (dbCartItems) {
      dbCartItems.forEach(element => {
        products[element.key] = {count: parseInt(element.count, 0),
          title: element.title,
          price: parseInt(element.price, 0),
          imgUrl: element.imgUrl};
      });
    }
    if (cartItems) {
      const cartItem = cartItems.split('-oShopCartItem-');
      cartItem.forEach(element => {
        const item = element.split('-oShopCart-');
        if (item[0] !== '' ||
         item[1] !== undefined ||
          item[2] !== undefined ||
          item[3] !== undefined ||
           item[4] !== undefined) {
             // ################## //
            if (products[item[0]] === undefined) {
                products[item[0]] = {count: parseInt(item[1], 0),
                  title: item[2],
                  price: parseInt(item[3], 0),
                  imgUrl: item[4]};
            } else {
              products[item[0]].count ++;
            }
        }
      });
    }
    return products;
  }

  // update cart in anonymousUser
  private updateCart(uid: string, dbCartItems) {
    const cartItems = this.retriveCompleteCart(dbCartItems);
    if (cartItems !== null) {
       this.dataService.update('/shopping-cart' , uid, cartItems);
      this.clearCartStorage();
    }
  }

  // Localstorage
  // ####################### //
  addToCartLocal(productKey: string, product: Product) {
    this.storeCart(productKey, product);
  }


  getCartLocal(productKey ?: string): CartItem[] {
    let products: CartItem[];
    products = [];
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
               count: parseInt(item[1], 0),
               title: item[2],
               price: parseInt(item[3], 0),
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
          return  [{ key : item[0],
            count: parseInt(item[1], 0),
            title: item[2],
            price: parseInt(item[3], 0),
            imgUrl: item[4]}];
       }
     }
    return products;
  }

  updateCountLocal(productKey: string, count: number) {
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

   // clear local storage once loggeg in
  clearCartStorage() {
    localStorage.removeItem('cart-item');
    localStorage.removeItem('cart-item-count');
  }
  // ####################### //


  // Firebase
  // ####################### //
  async getCartFromDB(uid: string): Promise<Observable<CartItem[]>> {
    return this.dataService.getAll('/shopping-cart/' + uid);
  }
  async getItemCountFromDB(uid: string, productKey: string): Promise<Observable<CartItem>>  {
    return  this.dataService.get('/shopping-cart/' + uid + '/' + productKey + '/count')
    .pipe(
      switchMap(itemCount => {
        if (itemCount) {
          return Observable.of(itemCount);
        }

        return Observable.of(null);
      })
    );
  }
  addToCartDB ( uid: string, productKey: string, product: Product) {
    this.dataService.createObject('/shopping-cart/' + uid + '/' + productKey, {
      count : 1,
      title : product.title,
      price: product.price,
      imgUrl: product.imgUrl
    });
  }
  updateCountFromDB(uid: string, productKey: string, count: number) {
    this.dataService.get('/shopping-cart/' + uid + '/' + productKey).pipe(take(1))
    .subscribe(item => {
      item['count'] += count;
      if (item['count'] > 0) {
        this.dataService.update('/shopping-cart/' + uid , productKey,   item);
      } else {
        this.dataService.remove('/shopping-cart/' + uid , productKey);
      }
    });
  }

  clearCartFromDB(uid: string) {
    this.dataService.remove('/shopping-cart/' , uid);
  }
  // ####################### //

  // update database and localstorage once user looged in
  updateAllCartItems(uid: string) {
    // first get all from db
    this.dataService.getAll('/shopping-cart/' + uid).pipe(take(1)).subscribe(cartItems => {
      this.updateCart(uid, cartItems);
    });
  }

}
