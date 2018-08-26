import { CheckOut } from './check-out';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

export class MyOrders {

    constructor(public orders: CheckOut[]) {
    }

    get orderDetails() {
        const orderList: { key: string, dateOfCreation: string}[] = [];
        this.orders.forEach(order => {
            orderList.push ({key: order.key, dateOfCreation: order.dateOfCreation});
        });
        return orderList;
    }
}
