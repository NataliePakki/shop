import { Injectable } from '@angular/core';

import { Order } from '@order/models/order.model';
import { CoreModule } from '@core/core.module';

const orders: Order[] = [];
const ordersPromise = Promise.resolve(orders);

@Injectable({
  providedIn: CoreModule
})
export class OrdersService {


  constructor() { }

  getAll(): Promise<Order[]> {
    return ordersPromise;
  }

  get(id: string): Promise<Order> {
    return this.getAll().then(products => products.find((product) => product.id === id));
  }

  add(order: Order): void {
    orders.push(order);
  }

  update(order: Order): void {
    const i = orders.findIndex(o => o.id === order.id);

    if (i > -1) {
      orders.splice(i, 1, order);
    }
  }

  remove(id: string): void {
    const i = orders.findIndex(p => p.id === id);

    if (i > -1) {
      orders.splice(i, 1);
    }
  }
}
