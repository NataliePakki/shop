import { Component, OnInit } from '@angular/core';

import { CartService } from './services/cart.service';
import { Cart } from './models/cart.model';
import { ProductsService } from '@app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Cart[] = [];

  constructor(private productsService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getAll();
  }

  onDelete(id: string) {
    this.cartService.remove(id);
    this.items = this.cartService.getAll();
    this.productsService.toggleIsAvailable(id);
  }

}
