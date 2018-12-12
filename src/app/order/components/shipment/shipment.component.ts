import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CartService, OrdersService, ProductsService } from '@core/services';
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
    private cartService: CartService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private location: Location,
    private router: Router,
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
    this.ordersService.add(this.order);
    this.cartService.clear();
    this.router.navigate(['success-page']);
  }

  onGoBack() {
    this.cartService.toggleSubmit();
    this.location.back();
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
