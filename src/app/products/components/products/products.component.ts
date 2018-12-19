import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '@core/+store';
import { getProductsReviewsData } from '@store/products-reviews';
import * as ProductsActions from '@store/products/products.actions';
import * as ProductsReviewsActions from '@store/products-reviews/products-reviews.actions';
import * as RouterActions from '@store/router';

import { CartService } from '@core/services';
import { Review } from '@products/models/review';
import { CartModel } from '@cart/models/cart.model';
import { Product } from '@products/models/product.model';
import { AutoUnsubscribe } from '@core/decorators/auto-unsubscribe.decorator';
import { getProductsData, getProductsError } from '@core/+store/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
@AutoUnsubscribe()
export class ProductsComponent implements OnInit, OnDestroy {
  reviews: Array<Review>;
  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;
  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.products$ = this.store.pipe(select(getProductsData));
    this.productsError$ = this.store.pipe(select(getProductsError));
    this.sub = this.store.pipe(select(getProductsReviewsData)).subscribe(reviews => {
      this.reviews = <Array<Review>>reviews;
    });

    this.store.dispatch(new ProductsActions.GetProducts());
    this.store.dispatch(new ProductsReviewsActions.GetProductsReviews());
  }

  ngOnDestroy() {
    this.store.dispatch(new RouterActions.Go({ path: ['/', { outlets: { reviews: null } } ]}));
  }

  onBuy(value: any) {
    console.log(value.product + ' - ' + value.count);
    const product = value.product;
    const count = value.count;
    this.store.dispatch(new ProductsActions.AdjustProductCount(product.id, -count));
    this.cartService.add(new CartModel(product.id, product.name, product.price, count, product.count));
  }

  onReviewOpened(id: string) {
    this.store.dispatch(new RouterActions.Go({ path: [{ outlets: { reviews: [ id ] } }]}));
  }

  reviewsCount(productId: string): number {
    return this.reviews ? this.reviews.filter(r => r.productId === productId).length : 0;
  }
}
