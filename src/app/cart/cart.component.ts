import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService, ProductsService } from '@core/services';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(public cartService: CartService, private productsService: ProductsService) { }

  ngOnInit() {}

  ngOnDestroy() {}

  onDelete(id: string) {
    const item = this.cartService.get(id);
    const count = item.count;
    this.cartService.remove(id);
    this.productsService.increaseCount(id, count);
  }

  onAdjusted(item: Cart) {
    this.cartService.adjustCount(item.id, item.count);
    this.productsService.adjustCount(item.id, -item.count);
  }

  clear(event: any) {
    event && event.preventDefault();
    this.cartService.getAll().forEach(item => {
      this.productsService.adjustCount(item.id, item.count);
      this.cartService.adjustCount(item.id, -item.count);
    });
  }

  getCount(): number {
    return this.cartService.getCount();
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }
}
