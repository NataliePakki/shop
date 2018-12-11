import { Component, OnInit } from '@angular/core';

import { Order, OrderState } from '@order/models/order.model';
import { OrdersService } from '@core/services';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[];
  orderStates = Object.keys(OrderState);

  constructor(
    public ordersService: OrdersService
  ) { }

  ngOnInit() {
  }

  onOrderStatusChanged(id: string, state: OrderState) {
    this.ordersService.get(id).then((order) => {
      order.state = state;
      this.ordersService.update(order);
    });
  }

}