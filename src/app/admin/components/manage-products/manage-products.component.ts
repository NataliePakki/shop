import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductsService } from '@core/services';
import { Product } from '@products/models/product.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
    this.products$ = this.productsService.getAll();
  }

  onDeleteProduct(product: Product) {
    if (window.confirm('Are you sure?')) {
      this.productsService.remove(product).then(() => {
        this.products$ = this.productsService.getAll();
      });
    }
  }
}
