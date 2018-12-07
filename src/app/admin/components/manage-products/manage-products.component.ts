import { Component, OnInit } from '@angular/core';

import { ProductsService } from '@core/services';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
  }

  onDeleteProduct(id: string) {
    if (window.confirm('Are you sure?')) {
      this.productsService.remove(id);
    }
  }
}
