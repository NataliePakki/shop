import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService, CartService } from '@core/services';
import { CartModel } from '@cart/models/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(
    public productService: ProductsService,
    private cartService: CartService,
    private router: Router) {}

  ngOnInit() { }

  ngOnDestroy() {
    this.router.navigate(['/', { outlets: { reviews: null } }]);
  }

  onBuy(value: any) {
    this.productService.get(value.id).then((pr) => {
      if (pr && pr.count > 0) {
        this.cartService.add(new CartModel(pr.id, pr.name, pr.price, value.count, pr.count));
        this.productService.decreaseCount(value.id, value.count);
      }
    });
  }

}
