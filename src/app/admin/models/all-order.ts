import { ManageOrder } from './manage-order';

export class AllOrders {
    constructor(public raw_orders: any) {}

    get list() {
        const orderList: {customerId: string, orderNo: string, details: ManageOrder}[] = [];
        this.raw_orders.forEach(orders => {
            let customerId: string;
            for (const id in orders) {
                if (orders.hasOwnProperty(id)) {
                    if (id === 'key') {
                       customerId = orders[id];
                    } else {
                       const order = orders[id];
                       orderList.splice(0, 0, {customerId: customerId, orderNo: id, details: order});
                    }
                }
            }
        });
        return orderList;
    }
}
