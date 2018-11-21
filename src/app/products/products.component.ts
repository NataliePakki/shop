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

  constructor(public productService: ProductsService, private cartService: CartService) {}

  ngOnInit() { }

  ngOnDestroy() { }

  onBuy(value: any) {
    const pr = this.productService.get(value.id);

    if (pr && pr.count > 0) {
      this.cartService.add(new CartModel(pr.id, pr.name, pr.price, value.count, pr.count));
      this.productService.decreaseCount(value.id, value.count);
    }
  }
}
