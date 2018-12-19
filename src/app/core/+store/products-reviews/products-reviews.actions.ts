import { Action } from '@ngrx/store';

import { Review } from '@products/models/review';

// [ProductsReviews]- namespace
export enum ProductsReviewsActionTypes {
  GET_PRODUCTS_REVIEWS = '[ProductsReviews] GET_PRODUCTS_REVIEWS',
  GET_PRODUCTS_REVIEWS_SUCCESS = '[ProductsReviews] GET_PRODUCTS_REVIEWS_SUCCESS',
  GET_PRODUCTS_REVIEWS_ERROR   = '[ProductsReviews] GET_PRODUCTS_REVIEWS_ERROR',
  GET_PRODUCT_REVIEWS = '[ProductsReviews] GET_PRODUCT_REVIEWS',
  GET_PRODUCT_REVIEWS_SUCCESS = '[ProductsReviews] GET_PRODUCT_REVIEWS_SUCCESS',
  GET_PRODUCT_REVIEWS_ERROR = '[ProductsReviews] GET_PRODUCT_REVIEWS_ERROR',
  CREATE_PRODUCT_REVIEW = '[ProductsReviews] CREATE_PRODUCT_REVIEW',
  CREATE_PRODUCT_REVIEW_SUCCESS = '[ProductsReviews] CREATE_PRODUCT_REVIEW_SUCCESS',
  CREATE_PRODUCT_REVIEW_ERROR   = '[ProductsReviews] CREATE_PRODUCT_REVIEW_ERROR',
  UPDATE_PRODUCT_REVIEW = '[ProductsReviews] UPDATE_PRODUCT_REVIEW',
  UPDATE_PRODUCT_REVIEW_SUCCESS = '[ProductsReviews] UPDATE_PRODUCT_REVIEW_SUCCESS',
  UPDATE_PRODUCT_REVIEW_ERROR   = '[ProductsReviews] UPDATE_PRODUCT_REVIEW_ERROR',
  DELETE_PRODUCT_REVIEW = '[ProductsReviews] DELETE_PRODUCT_REVIEW',
  DELETE_PRODUCT_REVIEW_SUCCESS = '[ProductsReviews] DELETE_PRODUCT_REVIEW_SUCCESS',
  DELETE_PRODUCT_REVIEW_ERROR = '[ProductsReviews] DELETE_PRODUCT_REVIEW_ERROR',
}

export class GetProductsReviews implements Action {
  readonly type = ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS;
}

export class GetProductsReviewsSuccess implements Action {
  readonly type = ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS_SUCCESS;
  constructor(public payload: Review[]) { }
}

export class GetProductsReviewsError implements Action {
  readonly type = ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS_ERROR;
  constructor(public payload: Error | string) { }
}

export class GetProductReviews implements Action {
  readonly type = ProductsReviewsActionTypes.GET_PRODUCT_REVIEWS;
  constructor(public payload: string) { }
}

export class GetProductReviewsSuccess implements Action {
  readonly type = ProductsReviewsActionTypes.GET_PRODUCT_REVIEWS_SUCCESS;
  constructor(public payload: Review[]) { }
}

export class GetProductReviewsError implements Action {
  readonly type = ProductsReviewsActionTypes.GET_PRODUCT_REVIEWS_ERROR;
  constructor(public payload: Error | string) { }
}

export class CreateProductReview implements Action {
  readonly type = ProductsReviewsActionTypes.CREATE_PRODUCT_REVIEW;
  constructor(public payload: Review) { }
}

export class CreateProductReviewSuccess implements Action {
  readonly type = ProductsReviewsActionTypes.CREATE_PRODUCT_REVIEW_SUCCESS;
  constructor(public payload: Review) { }
}

export class CreateProductReviewError implements Action {
  readonly type = ProductsReviewsActionTypes.CREATE_PRODUCT_REVIEW_ERROR;
  constructor(public payload: Error | string) { }
}

export class UpdateProductReview implements Action {
  readonly type = ProductsReviewsActionTypes.UPDATE_PRODUCT_REVIEW;
  constructor(public payload: Review) { }
}

export class UpdateProductReviewSuccess implements Action {
  readonly type = ProductsReviewsActionTypes.UPDATE_PRODUCT_REVIEW_SUCCESS;
  constructor(public payload: Review) { }
}

export class UpdateProductReviewError implements Action {
  readonly type = ProductsReviewsActionTypes.UPDATE_PRODUCT_REVIEW_ERROR;
  constructor(public payload: Error | string) { }
}

export class DeleteProductReview implements Action {
  readonly type = ProductsReviewsActionTypes.DELETE_PRODUCT_REVIEW;
  constructor(public payload: Review) { }
}

export class DeleteProductReviewSuccess implements Action {
  readonly type = ProductsReviewsActionTypes.DELETE_PRODUCT_REVIEW_SUCCESS;
  constructor(public payload: Review) { }
}

export class DeleteProductReviewError implements Action {
  readonly type = ProductsReviewsActionTypes.DELETE_PRODUCT_REVIEW_ERROR;
  constructor(public payload: Error | string) { }
}

export type ProductsReviewsActions
  = GetProductsReviews
  | GetProductsReviewsSuccess
  | GetProductsReviewsError
  | GetProductReviews
  | GetProductReviewsSuccess
  | GetProductReviewsError
  | CreateProductReview
  | CreateProductReviewSuccess
  | CreateProductReviewError
  | UpdateProductReview
  | UpdateProductReviewSuccess
  | UpdateProductReviewError
  | DeleteProductReview
  | DeleteProductReviewSuccess
  | DeleteProductReviewError;
