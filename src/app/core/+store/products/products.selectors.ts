import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';
import { getRouterState } from '../router';

import { Product, ProductModel } from '@products/models/product.model';

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getProductsData = createSelector(getProductsState, (state: ProductsState) => state.data);
export const getProductsError = createSelector(getProductsState, (state: ProductsState) => state.error);
export const getProductsLoaded = createSelector(getProductsState, (state: ProductsState) => state.loaded);
export const getSelectedProductByUrl = createSelector(
  getProductsData,
  getRouterState,
  (products, router): Product => {
      const productID = router.state.params.productID || router.state.outletParams && router.state.outletParams.productID;
      if (productID) {
          return products.find(product => product.id === productID);
      } else {
          return new ProductModel();
      }
});

