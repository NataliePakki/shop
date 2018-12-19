import { Review } from '@products/models/review';

export interface ProductsReviewsState {
  data: ReadonlyArray<Review>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
  readonly productReviews: Review[];
}

export const initialProductsReviewsState: ProductsReviewsState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
    productReviews: []
};
