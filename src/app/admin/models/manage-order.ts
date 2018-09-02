import { CartItem } from 'shared/models/cart-item';

export interface ManageOrder {
    customerName: string;
    dateOfCreation: string;
    shipping: any;
    items: CartItem[];
}
