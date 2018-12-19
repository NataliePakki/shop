
import { Injectable, Inject, forwardRef } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';
import { switchMap, pluck, concatMap, map } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ProductsActionTypes } from './products.actions';
import * as ProductsActions from './products.actions';
import * as RouterActions from '@store/router';

import { Product } from '@products/models/product.model';
import { ProductsService } from '@core/services';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    @Inject(forwardRef(() => ProductsService)) private productsService: ProductsService) {}

    @Effect()
    getProducts$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsActions.GetProducts>(ProductsActionTypes.GET_PRODUCTS),
      switchMap((action: ProductsActions.GetProducts) =>
        this.productsService
          .getAll()
          .toPromise()
          .then(products => new ProductsActions.GetProductsSuccess(products))
          .catch(err => new ProductsActions.GetProductsError(err))
      )
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ProductsActions.UpdateProduct>(ProductsActions.ProductsActionTypes.UPDATE_PRODUCT),
        pluck('payload'),
        concatMap((payload: Product) =>
          this.productsService
            .update(payload)
            .then(product => new ProductsActions.UpdateProductSuccess(product))
            .catch(err => new ProductsActions.UpdateProductError(err))
        )
    );

    @Effect()
    createProduct$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsActions.CreateProduct>(ProductsActions.ProductsActionTypes.CREATE_PRODUCT),
      pluck('payload'),
      concatMap((payload: Product) =>
        this.productsService
          .add(payload)
          .then(task => new ProductsActions.CreateProductSuccess(task))
          .catch(err => new ProductsActions.CreateProductError(err))
      )
    );

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsActions.DeleteProduct>(ProductsActions.ProductsActionTypes.DELETE_PRODUCT),
      pluck('payload'),
      concatMap((payload: Product) =>
        this.productsService
          .remove(payload)
          .then(() => new ProductsActions.DeleteProductSuccess(payload))
          .catch(err => new ProductsActions.DeleteProductError(err))
      )
    );

    @Effect()
    adjustProductCount$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsActions.AdjustProductCount>(ProductsActions.ProductsActionTypes.ADJUSTED_PRODUCT_COUNT),
      switchMap((action: ProductsActions.AdjustProductCount) =>
        this.productsService.adjustCount(action.payload, action.count)
        .then((updateProduct) => new ProductsActions.UpdateProductSuccess(updateProduct))
        .catch(err => new ProductsActions.UpdateProductError(err))
      )
    );

    @Effect()
    createProductSuccess$: Observable<Action> = this.actions$.pipe(
      ofType<ProductsActions.CreateProduct>(ProductsActions.ProductsActionTypes.CREATE_PRODUCT_SUCCESS),
      map(
        action =>
          new RouterActions.Go({
            path: ['/admin', 'products']
          })
      )
    );

}
