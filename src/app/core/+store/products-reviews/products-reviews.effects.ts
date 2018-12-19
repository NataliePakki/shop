
import { Injectable, Inject, forwardRef } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';
import { switchMap, pluck, concatMap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ProductsReviewsActionTypes } from './products-reviews.actions';
import * as ProductsReviewsActions from './products-reviews.actions';

import { ProductsReviewsService } from '@core/services';
import { Review } from '@products/models/review';

@Injectable()
export class ProductsReviewsEffects {
  constructor(
    private actions$: Actions,
    @Inject(forwardRef(() => ProductsReviewsService)) private productsReviewsService: ProductsReviewsService) {}

    @Effect()
    getReviews$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsReviewsActions.GetProductsReviews>(ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS),
      switchMap((action: ProductsReviewsActions.GetProductsReviews) =>
        this.productsReviewsService
          .getAll()
          .toPromise()
          .then(reviews => new ProductsReviewsActions.GetProductsReviewsSuccess(reviews))
          .catch(err => new ProductsReviewsActions.GetProductsReviewsError(err))
      )
    );

    @Effect()
    getProductReviews$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsReviewsActions.GetProductReviews>(ProductsReviewsActions.ProductsReviewsActionTypes.GET_PRODUCT_REVIEWS),
      pluck('payload'),
      switchMap(payload =>
        this.productsReviewsService
          .get(payload.toString())
          .then(reviews => new ProductsReviewsActions.GetProductReviewsSuccess(reviews))
          .catch(err => new ProductsReviewsActions.GetProductReviewsError(err))
      )
    );

    @Effect()
    updateReview$: Observable<Action> = this.actions$.pipe(
        ofType<ProductsReviewsActions.UpdateProductReview>(ProductsReviewsActions.ProductsReviewsActionTypes.UPDATE_PRODUCT_REVIEW),
        pluck('payload'),
        concatMap((payload: Review) =>
          this.productsReviewsService
            .update(payload)
            .then(review => {
              return new ProductsReviewsActions.UpdateProductReviewSuccess(review);
            })
            .catch(err => new ProductsReviewsActions.UpdateProductReviewError(err))
        )
    );

    @Effect()
    createReview$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsReviewsActions.CreateProductReview>(ProductsReviewsActions.ProductsReviewsActionTypes.CREATE_PRODUCT_REVIEW),
      pluck('payload'),
      concatMap((payload: Review) =>
        this.productsReviewsService
          .add(payload)
          .then(review => {
            return new ProductsReviewsActions.CreateProductReviewSuccess(review);
          })
          .catch(err => new ProductsReviewsActions.CreateProductReviewError(err))
      )
    );

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsReviewsActions.DeleteProductReview>(ProductsReviewsActions.ProductsReviewsActionTypes.DELETE_PRODUCT_REVIEW),
      pluck('payload'),
      concatMap((payload: Review) =>
        this.productsReviewsService
          .remove(payload)
          .then(
            () => {
              return new ProductsReviewsActions.DeleteProductReviewSuccess(payload);
            }
          )
          .catch(err => new ProductsReviewsActions.DeleteProductReviewError(err))
      )
    );
}
