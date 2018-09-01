import { CartItem } from 'shared/models/cart-item';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

export interface CheckOut {
    dateOfCreation: string;
    customerName: string;
    items: CartItem[];
    shippingDetails: any;
    key ?: string;
}
