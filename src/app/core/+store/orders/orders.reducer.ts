import { OrdersActions, OrdersActionTypes } from './orders.actions';
import { OrdersState, initialOrdersState, orderAdapter } from './orders.state';

import { Order } from '@order/models/order.model';

export function ordersReducer(
  state = initialOrdersState,
  action: OrdersActions
): OrdersState {
  switch (action.type) {

    case OrdersActionTypes.GET_ORDER: {
      return {
        ...state,
        loading: true
      };
    }

    case OrdersActionTypes.GET_ORDER_SUCCESS: {
      const selectedOrder = { ...<Order>action.payload };

      return {
        ...state,
        loading: false,
        loaded: true,
        selectedOrder
      };
    }

    case OrdersActionTypes.GET_ORDER_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case OrdersActionTypes.GET_ORDERS: {
      return {
        ...state,
        loading: true
      };
    }

    case OrdersActionTypes.GET_ORDERS_SUCCESS: {
      const orders = [...<Array<Order>>action.payload];

      return orderAdapter.addAll(orders, {...state, loading: false, loaded: true, selectedOrder: null});
    }

    case OrdersActionTypes.GET_ORDERS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case OrdersActionTypes.CREATE_ORDER_SUCCESS: {
      const order = { ...<Order>action.payload };

      return orderAdapter.addOne(order, state);
    }

    case OrdersActionTypes.UPDATE_ORDER_SUCCESS: {
      const order = { ...<Order>action.payload };

      return orderAdapter.updateOne({
          id: order.id,
          changes: order
      }, state);
    }

    case OrdersActionTypes.DELETE_ORDER_SUCCESS: {
      const order = { ...<Order>action.payload };

      return orderAdapter.removeOne(order.id, state);
    }

    case OrdersActionTypes.CREATE_ORDER_ERROR:
    case OrdersActionTypes.UPDATE_ORDER_ERROR:
    case OrdersActionTypes.DELETE_ORDER_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    default: {
      return state;
    }
  }
}

