import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@core/+store';
import * as OrderActions from '@store/orders/orders.actions';
import * as RouterActions from '@store/router';

import { CartService, ProductsService } from '@core/services';
import { Order, OrderState } from '@order/models/order.model';
import { CanComponentDeactivate } from '@core/interfaces/can-component-deactivate.interface';

@Component({
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  order: Order;
  originalOrder: Order;

  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.order = this.createNewOrder();
    this.originalOrder = {...this.order};
  }

  ngOnDestroy() {
    if (this.order.state !== OrderState.Submitted) {
      this.cartService.toggleSubmit();
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.order.state !== OrderState.Submitted) {
      const flags = Object.keys(this.originalOrder).map(key => {
        if (this.originalOrder[key] === this.order[key]) {
          return true;
        }
        return false;
      });

      if (flags.every(el => el)) {
        return true;
      }

      return window.confirm('Discard changes?');
    }
    return true;
  }

  onSubmit() {
    this.order.state = OrderState.Submitted;
    this.store.dispatch(new OrderActions.CreateOrder(this.order));
    this.cartService.clear();
  }

  onGoBack() {
    this.cartService.toggleSubmit();
    this.store.dispatch(new RouterActions.Back());
  }

  private createNewOrder(): Order {
    const products = [];
    this.cartService.getAll().forEach((item) => {
      this.productsService.get(item.id)
      .then(pr =>  {
          const product = {...pr};
          product.count = item.count;
          products.push(product);
      });
    });

    return new Order(products, this.cartService.getSubtotal());
  }
}
