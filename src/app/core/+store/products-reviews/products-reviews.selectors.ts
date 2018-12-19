import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsReviewsState } from './products-reviews.state';

export const getProductsReviewsState = createFeatureSelector<ProductsReviewsState>('products-reviews');

export const getProductsReviewsData = createSelector(getProductsReviewsState, (state: ProductsReviewsState) => state.data);
export const getProductsReviewsError = createSelector(getProductsReviewsState, (state: ProductsReviewsState) => state.error);
export const getProductReviews = createSelector(getProductsReviewsState, (state: ProductsReviewsState) => state.productReviews);
export const getProductsReviewsLoaded = createSelector(getProductsReviewsState, (state: ProductsReviewsState) => state.loaded);
