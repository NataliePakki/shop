import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService, ProductsService } from '@core/services';
import { Cart, CartModel } from './models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  items: Cart[] = [];

  constructor(private cartService: CartService, private productsService: ProductsService) { }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.items = [];
  }

  onDelete(id: string) {
    this.cartService.remove(id);
    this.productsService.toggleIsAvailable(id);
    this.init();
  }

  init() {
    this.items = this.cartService.getAll();
  }

  getCount(): number {
    return this.cartService.getCount();
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  add(id: string, name: string, price: number) {
    this.cartService.add(new CartModel(id, name, price));
    this.init();
  }

}
