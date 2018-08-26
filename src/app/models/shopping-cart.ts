import { CartItem } from './cart-item';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

export class ShoppingCart {
    constructor(public cartItems: CartItem[]) {}
    // ********************************************************************************************** //
    get totalCount() {
        let count = 0;
        if (this.cartItems !== null || this.cartItems !== undefined) {
            this.cartItems.forEach(item => {
              count += item.quantity;
            });
         }
         return count;
    }
    // ********************************************************************************************** //
    get totalPrice() {
        let price = 0;
        if (this.cartItems !== null || this.cartItems !== undefined) {
            this.cartItems.forEach(item => {
              price += (item.price * item.quantity);
            });
         }
         return price;
    }
}
