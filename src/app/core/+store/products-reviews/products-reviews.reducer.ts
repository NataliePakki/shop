
import { ProductsReviewsActions, ProductsReviewsActionTypes } from './products-reviews.actions';
import { ProductsReviewsState, initialProductsReviewsState } from './products-reviews.state';

import { Review } from '@products/models/review';

export function productsReviewsReducer(
  state = initialProductsReviewsState,
  action: ProductsReviewsActions
  ): ProductsReviewsState {

  switch (action.type) {
    case ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS: {
      return {
        ...state,
        loading: true,
        productReviews: []
      };
    }

    case ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS_SUCCESS: {
      const data = [...<Array<Review>>action.payload];
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
      };
    }

    case ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case ProductsReviewsActionTypes.GET_PRODUCT_REVIEWS: {
      return {
        ...state,
        loading: true
      };
    }

    case ProductsReviewsActionTypes.GET_PRODUCT_REVIEWS_SUCCESS: {
      const productReviews = <Review[]>action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        productReviews: productReviews
      };
    }

    case ProductsReviewsActionTypes.GET_PRODUCTS_REVIEWS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case ProductsReviewsActionTypes.UPDATE_PRODUCT_REVIEW:
    case ProductsReviewsActionTypes.CREATE_PRODUCT_REVIEW:
    case ProductsReviewsActionTypes.DELETE_PRODUCT_REVIEW: {
      return {...state};
    }

    case ProductsReviewsActionTypes.CREATE_PRODUCT_REVIEW_SUCCESS: {
      const review = { ...<Review>action.payload };
      const data = [...state.data, review];

      return {
        ...state,
        data
      };
    }


    case ProductsReviewsActionTypes.UPDATE_PRODUCT_REVIEW_SUCCESS: {
      const review = { ...<Review>action.payload };
      const data = [...state.data];
      const index = data.findIndex(t => t.id === review.id);

      data[index] = review;

      return {
        ...state,
        data
      };
    }

    case ProductsReviewsActionTypes.DELETE_PRODUCT_REVIEW_SUCCESS: {
      const review = { ...<Review>action.payload };
      const data = state.data.filter(t => t.id !== review.id);

      return {
        ...state,
        data
      };
    }


    case ProductsReviewsActionTypes.UPDATE_PRODUCT_REVIEW_ERROR:
    case ProductsReviewsActionTypes.CREATE_PRODUCT_REVIEW_ERROR:
    case ProductsReviewsActionTypes.DELETE_PRODUCT_REVIEW_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    default: {
      return state;
    }
  }
}
