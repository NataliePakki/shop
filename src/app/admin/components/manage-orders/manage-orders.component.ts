import { Component, OnInit } from '@angular/core';

import { Order, OrderState } from '@order/models/order.model';
import { OrdersService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  orderStates = Object.keys(OrderState);

  constructor(
    public ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.orders$ = this.ordersService.getAll();
  }

  onOrderStatusChanged(id: string, state: OrderState) {
    this.ordersService.get(id).then((order) => {
      order.state = state;
      this.ordersService.update(order);
    });
  }
  onDeleteOrder(order: Order) {
    if (window.confirm('Are you sure?')) {
      this.ordersService.remove(order).then(() => {
        this.orders$ = this.ordersService.getAll();
      });
    }
  }

}
