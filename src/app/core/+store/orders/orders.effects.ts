
import { Injectable, Inject, forwardRef } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';
import { switchMap, pluck, concatMap, map } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { OrdersActionTypes } from './orders.actions';
import * as OrdersActions from './orders.actions';
import * as RouterActions from '@store/router';

import { OrdersService } from '@core/services';
import { Order } from '@order/models/order.model';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    @Inject(forwardRef(() => OrdersService)) private ordersService: OrdersService) {}

    @Effect()
    getOrders$: Observable<Action> = this.actions$.pipe(
      ofType<OrdersActions.GetOrders>(OrdersActionTypes.GET_ORDERS),
      switchMap((action: OrdersActions.GetOrders) =>
        this.ordersService
          .getAll()
          .toPromise()
          .then(orders => new OrdersActions.GetOrdersSuccess(orders))
          .catch(err => new OrdersActions.GetOrdersError(err))
      )
    );

    @Effect()
    getOrder$: Observable<Action> = this.actions$.pipe(
      ofType<OrdersActions.GetOrder>(OrdersActions.OrdersActionTypes.GET_ORDER),
      pluck('payload'),
      switchMap(payload =>
        this.ordersService
          .get(payload.toString())
          .then(order => new OrdersActions.GetOrderSuccess(order))
          .catch(err => new OrdersActions.GetOrderError(err))
      )
    );

    @Effect()
    updateOrder$: Observable<Action> = this.actions$.pipe(
        ofType<OrdersActions.UpdateOrder>(OrdersActions.OrdersActionTypes.UPDATE_ORDER),
        pluck('payload'),
        concatMap((payload: Order) =>
          this.ordersService
            .update(payload)
            .then(order => {
              return new OrdersActions.UpdateOrderSuccess(order);
            })
            .catch(err => new OrdersActions.UpdateOrderError(err))
        )
    );

    @Effect()
    createOrder$: Observable<Action> = this.actions$.pipe(
      ofType<OrdersActions.CreateOrder>(OrdersActions.OrdersActionTypes.CREATE_ORDER),
      pluck('payload'),
      concatMap((payload: Order) =>
        this.ordersService
          .add(payload)
          .then(order => new OrdersActions.CreateOrderSuccess(order))
          .catch(err => new OrdersActions.CreateOrderError(err))
      )
    );

    @Effect()
    deleteOrder$: Observable<Action> = this.actions$.pipe(
      ofType<OrdersActions.DeleteOrder>(OrdersActions.OrdersActionTypes.DELETE_ORDER),
      pluck('payload'),
      concatMap((payload: Order) =>
        this.ordersService
          .remove(payload)
          .then(() => new OrdersActions.DeleteOrderSuccess(payload))
          .catch(err => new OrdersActions.DeleteOrderError(err))
      )
    );

    @Effect()
    createOrderSuccess$: Observable<Action> = this.actions$.pipe(
      ofType<OrdersActions.CreateOrder>(OrdersActions.OrdersActionTypes.CREATE_ORDER_SUCCESS),
      map(
        action =>
          new RouterActions.Go({
            path: ['success-page']
          })
      )
    );
}
