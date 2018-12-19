import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '@core/+store';
import { getProductsData, getProductsError } from '@store/products';
import * as ProductsActions from '@store/products/products.actions';

import { Product } from '@products/models/product.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.pipe(select(getProductsData));
    this.productsError$ = this.store.pipe(select(getProductsError));
    this.store.dispatch(new ProductsActions.GetProducts());
  }

  onDeleteProduct(product: Product) {
    if (window.confirm('Are you sure?')) {
      this.store.dispatch(new ProductsActions.DeleteProduct(product));
    }
  }
}
