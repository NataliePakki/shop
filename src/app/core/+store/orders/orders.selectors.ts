import { createFeatureSelector, createSelector } from '@ngrx/store';
import { orderAdapter, OrdersState } from './orders.state';

export const getOrdersState = createFeatureSelector<OrdersState>('orders');

export const getOrdersError = createSelector(getOrdersState, (state: OrdersState) => state.error);
export const getSelectedOrder = createSelector(getOrdersState, (state: OrdersState) => state.selectedOrder);
export const getOrdersLoaded = createSelector(getOrdersState, (state: OrdersState) => state.loaded);

export const {
  selectEntities: getOrdersEntities,
  selectAll: getOrdersData
} = orderAdapter.getSelectors(getOrdersState);
