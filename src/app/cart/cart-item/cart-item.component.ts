import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() item: Cart;
  @Output() deleted = new EventEmitter();
  @Output() adjusted = new EventEmitter();

  constructor() { }

  onDelete() {
    this.deleted.emit(this.item.id);
  }

  onIncrease() {
    this.adjusted.emit({ id: this.item.id, count: 1});
  }

  onDecrease() {
    this.adjusted.emit({ id: this.item.id, count: -1});
  }

  getCount() {
    return this.item.count;
  }
}
