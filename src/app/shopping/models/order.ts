import { CartItem } from 'shared/models/cart-item';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

export class Order {
    dateOfCreation: string;
    order: any;

    constructor(public items: CartItem[], public shippingDetails: any, public customerName: string) {
        this.dateOfCreation = new Date().toLocaleDateString();
            this.order = {
               dateOfCreation : this.dateOfCreation,
               customerName: customerName,
               items : items,
               shippingDetails : shippingDetails
          };
    }

    get orderDetails() {
        return this.order;
    }
    get isValidOrder() {
        return this.order.items.length > 0;
    }
}
