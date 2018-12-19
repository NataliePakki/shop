import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '@core/+store';
import * as ProductsActions from '@store/products';
import * as RouterActions from '@store/router';

import { CartService } from '@core/services';
import { Cart } from '@cart/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  public orderByValues = [ 'count', 'price', 'name' ];
  public currOrderBy = 'name';
  public desc = true;
  constructor(
    private store: Store<AppState>,
    public cartService: CartService,
  ) { }

  ngOnInit() {}

  ngOnDestroy() {}

  onSubmit($event: any) {
    $event.target.disabled = true;
    this.cartService.toggleSubmit();
    this.store.dispatch(new RouterActions.Go({ path: ['checkout']}));
  }

  onDelete(id: string) {
    const item = this.cartService.get(id);
    const count = item.count;
    this.cartService.remove(id);
    this.store.dispatch(new ProductsActions.AdjustProductCount(id, count));
  }

  onAdjusted(item: Cart) {
    this.cartService.adjustCount(item.id, item.count);
    this.store.dispatch(new ProductsActions.AdjustProductCount(item.id, -item.count));
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
      this.store.dispatch(new ProductsActions.AdjustProductCount(item.id, item.count));
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
