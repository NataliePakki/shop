import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from './models/product.model';
import { ProductsService, CartService } from '@core/services';
import { CartModel } from '@cart/models/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  constructor(private productService: ProductsService, private cartService: CartService) {}

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.products = [];
  }

  onBuy(id: string) {
    const pr = this.productService.get(id);
    if (pr && pr.isAvailable) {
      this.productService.toggleIsAvailable(id);
      this.cartService.add(new CartModel(pr.id, pr.name, pr.price));
      this.init();
    }
  }

  toggleIsAvailable(id: string) {
    this.productService.toggleIsAvailable(id);
    this.init();
  }
  init() {
    this.products = this.productService.getAll();
  }
}
