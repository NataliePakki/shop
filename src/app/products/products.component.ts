import { Component, OnInit } from '@angular/core';

import { ProductsService } from './services/products.service';
import { Product } from './models/product.model';
import { CartService } from '@app/cart/services/cart.service';
import { CartModel } from '@app/cart/models/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.products = this.productService.getAll();
  }

  onBuy(id: string) {
    const pr = this.productService.get(id);
    if (pr) {
      this.productService.toggleIsAvailable(id);
      this.cartService.add(new CartModel(pr.id, pr.name, pr.price));
    }
  }

}
