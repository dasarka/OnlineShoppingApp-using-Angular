import { Injectable} from '@angular/core';
// Services
import { DataService } from '../data/data.service';
// Models
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
// Operators
import { Observable } from 'rxjs/Observable';
import { take, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor(
    private dataService: DataService
  ) { }

  // ********************************************************************************************** //
  // General methods
  // ********************************************************************************************** //
  private structureItemArr(items: any[], defaultValue) {
    const formattedItems = defaultValue;
    if (items) {
      items.forEach(item => {
        formattedItems[item.key] = {quantity: (parseInt(item.quantity, 0) || 1),
          title: item.title,
          price: parseInt(item.price, 0),
          imgUrl: item.imgUrl};
      });
    }
    return formattedItems;
  }
  // ********************************************************************************************** //
  private structureItem(item) {
    return { key: item.key,
      quantity: (parseInt(item.quantity, 0) || 1),
      title: item.title,
      price: parseInt(item.price, 0),
      imgUrl: item.imgUrl
    };
  }
  // ********************************************************************************************** //
  // ********************************************************************************************** //
  // All localstorage private method
  // ********************************************************************************************** //
  // storeCart for anonymousUser in localstorage
  // Function call time:- if anonymousUser clicked on add to cart button
  // ********************************************************************************************** //
  private async storeCart(itemId: string, item: Product) {
    let cartItems: CartItem[];
    cartItems = (await this.getLocalCart()).cartItems;
    const cartItem = JSON.stringify( this.structureItem(item));
    cartItems = (cartItems) ? cartItems : [];
    cartItems.push(JSON.parse(cartItem));
    this.updateLocalStorage('cart-item', JSON.stringify(cartItems));
  }
  // ********************************************************************************************** //
  // get cart items
  // Function call time:- on page load for anonymousUser - shopping cart component
  // ********************************************************************************************** //
  private async getLocalCart(): Promise<ShoppingCart> {
    return new ShoppingCart(JSON.parse(localStorage.getItem('cart-item') || '[]'));
  }
  // ********************************************************************************************** //
  // get item count
  // Function call time:- on page load for anonymousUser- product card component
   // ********************************************************************************************** //
  private async fetchItemCountFromLocal(productKey: string) {
    const cartItems = (await this.getLocalCart()).cartItems;
    for (const item in cartItems) {
      if (cartItems.hasOwnProperty(item)) {
        if (cartItems[item]['key'] === productKey) {
          return Observable.of(cartItems[item]['quantity']) ;
        }
      }
    }
    return Observable.of(null);
  }
  // ********************************************************************************************** //
  private updateLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  // ********************************************************************************************** //
  // update count
  // Function call time: if anonymousUser clicked on either plus or minus button
  // ********************************************************************************************** //
  private async modifyCount(productKey: string, count: number) {
    const cartItems = (await this.getLocalCart()).cartItems;
    for (const item in cartItems) {
      if (cartItems.hasOwnProperty(item)) {
        if (cartItems[item]['key'] === productKey) {
          cartItems[item]['quantity'] += count;
          if (cartItems[item]['quantity'] < 1) {
            cartItems.splice(parseInt(item, 0), 1);
          }

          this.updateLocalStorage('cart-item', JSON.stringify(cartItems));
          return;
        }
      }
    }
  }
  // ********************************************************************************************** //
  // clear local storage
  // ********************************************************************************************** //
  private clearCartStorage() {
    localStorage.removeItem('cart-item');
    localStorage.removeItem('cart-item-count');
  }
  // ********************************************************************************************** //
  // ********************************************************************************************** //
  // All Firebase private methods
  // ********************************************************************************************** //
  // Get cart items from firebase
  // ********************************************************************************************** //
  private getCartItemFromFirebase(uid: String): Observable<CartItem[]> {
    return this.dataService.getAll('/shopping-cart/' + uid).pipe(
      switchMap(items => {
        if (items) {
          return Observable.of(items);
        }

        return Observable.of(null);
      })
    );
  }
  // ********************************************************************************************** //
  // Fetch Item count from firebase
  // ********************************************************************************************** //
  private async fetchItemCountFromDB(uid: string, productKey: string) {
    return  this.dataService.get('/shopping-cart/' + uid + '/' + productKey + '/quantity')
    .pipe(
      switchMap(itemCount => {
        if (itemCount) {
          return Observable.of(itemCount);
        }

        return Observable.of(null);
      })
    );
  }
  // ********************************************************************************************** //
  // ********************************************************************************************** //
  // All Public methods
  // ********************************************************************************************** //
  // ********************************************************************************************** //
  // Add Cart - Product Cart Component
  // ********************************************************************************************** //
  async addToCart(productKey: string, product: Product) {
    const uid = localStorage.getItem('userId');
      if (!uid) {
        return this.storeCart(productKey, product);
      }

      this.dataService.createObject('/shopping-cart/' + uid + '/' + productKey, {
        quantity : 1,
        title : product.title,
        price: product.price,
        imgUrl: product.imgUrl
      });
  }
  // ********************************************************************************************** //
  // Fetch all cart items
  // ********************************************************************************************** //
  async getCartItems(): Promise<Observable<ShoppingCart>> {
    const uid = localStorage.getItem('userId');
      if (!uid) {
        const cartItems = await this.getLocalCart();
        if (cartItems) {
          return Observable.of(cartItems);
        }
        return Observable.of(null);
      }

    return this.getCartItemFromFirebase(uid).pipe(
      map(items => {
        return new ShoppingCart(items);
      })
    );
  }
  // ********************************************************************************************** //
  // Get Item Count - Product Card Compoenet
  // ********************************************************************************************** //
  async getItemCount(productKey: string) {
    const uid = localStorage.getItem('userId');
      if (!uid) {
        return await this.fetchItemCountFromLocal(productKey);
      }

    return await this.fetchItemCountFromDB(uid, productKey);
  }
  // ********************************************************************************************** //
  // Update Item Count - Product Card & Shopping Componenet
  // ********************************************************************************************** //
  async updateCount(productKey: string, count: number) {
    const uid = localStorage.getItem('userId');
      if (!uid) {
        return this.modifyCount(productKey, count);
      }

        this.dataService.get('/shopping-cart/' + uid + '/' + productKey).pipe(take(1))
      .subscribe(item => {
        item['quantity'] += count;
        if (item['quantity'] > 0) {
          this.dataService.update('/shopping-cart/' + uid , productKey,   item);
        } else {
          this.dataService.remove('/shopping-cart/' + uid , productKey);
        }
      });
  }
  // ********************************************************************************************** //
  // Clear Shopping Cart
  // ********************************************************************************************** //
  async clearCart() {
    const uid = localStorage.getItem('userId');
      if (!uid) {
        return this.clearCartStorage();
      }

    this.dataService.remove('/shopping-cart/' , uid);
  }
  // ********************************************************************************************** //
  // ********************************************************************************************** //
  // ********************************************************************************************** //
  // update database and localstorage once user looged in
  // ********************************************************************************************** //
  // ********************************************************************************************** //
  // retrieve from localstorage
  // Function call time:- once user logged
  // ********************************************************************************************** //
  private async retriveCompleteCart(dbCartItems) {
    const cartItems = (await this.getLocalCart()).cartItems;
    let newCartItems =  this.structureItemArr(dbCartItems, {});
    if (cartItems) {
      newCartItems =  this.structureItemArr(cartItems, newCartItems);
    }
    return newCartItems;
  }
  // update cart in anonymousUser
  // ********************************************************************************************** //
  private async updateCart(uid: string, dbCartItems) {
    const cartItems = await this.retriveCompleteCart(dbCartItems);
    this.clearCartStorage();
    if (cartItems !== null) {
       await this.dataService.update('/shopping-cart' , uid, cartItems);
    }
  }
  // ********************************************************************************************** //
  async updateAllCartItems(uid: string) {
    // first get all from db
    this.dataService.getAll('/shopping-cart/' + uid).pipe(take(1)).subscribe(cartItems => {
      this.updateCart(uid, cartItems);
    });
  }
  // ********************************************************************************************** //
}
