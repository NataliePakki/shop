import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Product, ProductModel } from '@products/models/product.model';
import { Category } from '@products/models/category.enum';
import { ProductsService } from '@core/services';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product;
  categories = Object.keys(Category);

  constructor(
    private productsService: ProductsService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.product = new ProductModel();

    this.route.paramMap
      .pipe(
        switchMap((params: Params) => this.productsService.get(params.get('productID'))))
      .subscribe(
        product => this.product = {...product},
        err => console.log(err)
    );
  }

  onSaveProduct() {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.update(product);
    } else {
      this.productsService.add(product);
    }

    this.location.back();
  }

  onGoBack() {
    this.location.back();
  }

}
