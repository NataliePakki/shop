import { v4 as uuid } from 'uuid';

import { ShipmentData } from './shipment-data.model';
import { Product } from '@products/models/product.model';

export enum  OrderState {
  New = 'New',
  Submitted = 'Submitted',
  Shipped = 'Shipped',
  Completed = 'Completed'
}

export class Order {
  id: string;

  constructor(
    public products: Product[],
    public subtotal?: number,
    public shipmentDate: ShipmentData = new ShipmentData(),
              public state: OrderState = OrderState.New
  ) {
    this.id = uuid();
    if (!this.subtotal) {
      products.forEach(pr => this.subtotal += pr.price * pr.count);
    }
  }
}
