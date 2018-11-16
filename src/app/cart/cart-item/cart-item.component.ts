import { Component, Input, Output, EventEmitter,
            ChangeDetectionStrategy } from '@angular/core';

import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() item: Cart;
  @Output() deleted = new EventEmitter();

  constructor() { }

  onDelete() {
    this.deleted.emit(this.item.id);
  }
}
