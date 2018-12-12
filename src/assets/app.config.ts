import { InjectionToken } from '@angular/core';

const baseUrl = 'http://localhost:3000/';
const productsBaseUrl = baseUrl + 'products';
const ordersBaseUrl = baseUrl + 'orders';
const reviewsBaseUrl = baseUrl + 'reviews';

export const productsAPI = new InjectionToken<string>('productsAPI');
export const ordersAPI = new InjectionToken<string>('ordersAPI');
export const reviewsAPI = new InjectionToken<string>('reviewsAPI');


export const ProductsAPIProvider = {
    provide: productsAPI,
    useValue: productsBaseUrl
};
export const OrdersAPIProvider = {
  provide: ordersAPI,
  useValue: ordersBaseUrl
};
export const ReviewAPIProvider = {
  provide: reviewsAPI,
  useValue: reviewsBaseUrl
};

