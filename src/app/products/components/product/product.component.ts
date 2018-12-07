import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '@products/models/product.model';
import { ProductsReviewsService } from '@core/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() bought = new EventEmitter();
  private count = 1;
  reviewsLength = 0;

  constructor(
    private router: Router,
    private reviewsService: ProductsReviewsService
  ) { }

  ngOnInit() {
    this.reviewsLength = this.reviewsService.get(this.product.id).length;
  }

  onBuy(event: any) {
    event && event.preventDefault();
    this.bought.emit({ id: this.product.id, count: this.count });
    this.count = 1;
  }

  onOpenReviews($event: any) {
    $event.preventDefault();
    if (this.reviewsService.get(this.product.id).length > 0) {
      this.router.navigate([{ outlets: { reviews: [ this.product.id ] } }]);
    }
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
