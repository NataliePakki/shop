import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '@core/+store';
import { getSelectedProductByUrl  } from '@store/products';
import * as ProductsActions from '@store/products/products.actions';
import * as RouterActions from '@store/router';

import { Product } from '@products/models/product.model';
import { Category } from '@products/models/category.enum';
import { AutoUnsubscribe } from '@core/decorators/auto-unsubscribe.decorator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
@AutoUnsubscribe()
export class ProductFormComponent implements OnInit {
  private sub: Subscription;
  product: Product;
  categories = Object.keys(Category);

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
   this.sub = this.store
      .pipe(select(getSelectedProductByUrl))
      .subscribe(product => this.product = product);
  }

  onSaveProduct() {
    const product = { ...this.product };

    if (product.id) {
      product.lastUpdated = new Date();
      this.store.dispatch(new ProductsActions.UpdateProduct(product));
      this.store.dispatch(new RouterActions.Go({ path: ['/admin', 'products'] }));
    } else {
      this.store.dispatch(new ProductsActions.CreateProduct(product));
    }
  }

  onGoBack() {
    this.store.dispatch(new RouterActions.Back());
  }

}
