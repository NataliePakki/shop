import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService, ProductsService } from '@core/services';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  public orderByValues = [ 'count', 'price', 'name' ];
  public currOrderBy = 'name';
  public desc = true;
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

  onOrderByChanged(orderByValue: string) {
    if (this.currOrderBy === orderByValue) {
      this.desc = !this.desc;
    } else {
      this.currOrderBy = orderByValue;
    }
  }
  onOrderChanged() {
    this.desc = !this.desc;
  }

  clear(event: any) {
    event && event.preventDefault();
    this.cartService.getAll().forEach(item => {
      this.productsService.adjustCount(item.id, item.count);
    });
    this.cartService.clear();
  }

  getCount(): number {
    return this.cartService.getCount();
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }
}
