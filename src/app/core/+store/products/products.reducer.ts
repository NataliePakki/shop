import { ProductsActions, ProductsActionTypes } from './products.actions';
import { ProductsState, initialProductsState } from './products.state';

import { Product } from '@products/models/product.model';

export function productsReducer(
  state = initialProductsState,
  action: ProductsActions
  ): ProductsState {

  switch (action.type) {
    case ProductsActionTypes.GET_PRODUCTS: {
      return {
        ...state,
        loading: true
      };
    }

    case ProductsActionTypes.GET_PRODUCTS_SUCCESS: {
      const data = [...<Array<Product>>action.payload];
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
      };
    }

    case ProductsActionTypes.GET_PRODUCTS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case ProductsActionTypes.UPDATE_PRODUCT:
    case ProductsActionTypes.ADJUSTED_PRODUCT_COUNT:
    case ProductsActionTypes.CREATE_PRODUCT:
    case ProductsActionTypes.DELETE_PRODUCT: {
      return {...state};
    }

    case ProductsActionTypes.CREATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      const data = [...state.data, product];

      return {
        ...state,
        data
      };
    }


    case ProductsActionTypes.UPDATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      const data = [...state.data];
      const index = data.findIndex(t => t.id === product.id);

      data[index] = product;

      return {
        ...state,
        data
      };
    }

    case ProductsActionTypes.DELETE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      const data = state.data.filter(t => t.id !== product.id);

      return {
        ...state,
        data
      };
    }

    case ProductsActionTypes.UPDATE_PRODUCT_ERROR:
    case ProductsActionTypes.CREATE_PRODUCT_ERROR:
    case ProductsActionTypes.DELETE_PRODUCT_ERROR: {
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
