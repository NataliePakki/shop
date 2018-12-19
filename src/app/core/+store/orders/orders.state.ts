import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Order } from '@order/models/order.model';

export interface OrdersState extends EntityState<Order>  {
  selectedOrder: Readonly<Order>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialOrdersState: OrdersState = orderAdapter.getInitialState({
    loading: false,
    loaded: false,
    error: null,
    selectedOrder: null
});
