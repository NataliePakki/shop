import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '@products/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() reviewsCount: number;

  @Output() bought = new EventEmitter();
  @Output() reviewOpened = new EventEmitter();
  private count = 1;

  constructor( ) { }

  ngOnInit() {}

  onBuy(event: any) {
    event && event.preventDefault();
    this.bought.emit({ product: this.product, count: this.count });
    this.count = 1;
  }

  onOpenReviews($event: any) {
    $event.preventDefault();
    this.reviewOpened.emit(this.product.id);
  }

  onIncrease() {
    this.count++;
  }

  onDecrease() {
    this.count--;
  }

  getCount() {
    return this.count;
  }
}
