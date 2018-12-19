import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '@core/+store';
import { getSelectedProductByUrl } from '@store/products';
import { getProductReviews } from '@store/products-reviews';
import * as ProductsReviewsActions from '@store/products-reviews/products-reviews.actions';
import * as RouterActions from '@store/router';

import { Review } from '@products/models/review';
import { AutoUnsubscribe } from '@core/decorators/auto-unsubscribe.decorator';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
@AutoUnsubscribe()
export class ProductReviewsComponent implements OnInit {
  public reviews: Review[];
  public name: string;
  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.sub = this.store
    .pipe(select(getSelectedProductByUrl))
    .subscribe(product => this.name = product.name);

    this.sub.add(this.store.pipe(select(getProductReviews))
      .subscribe((reviews: Review[]) => {
        if (reviews) {
          this.reviews = <Review[]>reviews;
        } else {
          this.reviews = [];
        }
      }));

    this.route.paramMap.subscribe(params => {
      const id = params.get('productID');
      if (id) {
        this.store.dispatch(new ProductsReviewsActions.GetProductReviews(id));
      }
    });
  }

  onClose() {
    this.store.dispatch(new RouterActions.Go({path: ['/', { outlets: { reviews: null } }]}));
  }
}
