import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '@core/+store';
import { Order, OrderState } from '@order/models/order.model';
import { getOrdersData, getOrdersError } from '@store/orders';
import * as OrdersActions from '@store/orders/orders.actions';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders$: Observable<ReadonlyArray<Order>>;
  ordersError$: Observable<Error | string>;
  orderStates = Object.keys(OrderState);

  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.orders$ = this.store.pipe(select(getOrdersData));
    this.ordersError$ = this.store.pipe(select(getOrdersError));
    this.store.dispatch(new OrdersActions.GetOrders());
  }

  onOrderStatusChanged(order: Order, state: OrderState) {
    const updatedOrder = { ...order, state: state };
    this.store.dispatch(new OrdersActions.UpdateOrder(updatedOrder));
  }
  onDeleteOrder(order: Order) {
    if (window.confirm('Are you sure?')) {
      this.store.dispatch(new OrdersActions.DeleteOrder(order));
    }
  }
}
