import { ProductsState } from './products';
import { OrdersState } from './orders/orders.state';

export interface AppState {
  products: ProductsState;
  orders: OrdersState;
}
