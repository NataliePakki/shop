import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ProductsService, CartService, ProductsReviewsService } from '@core/services';
import { CartModel } from '@cart/models/cart.model';
import { Product } from '@products/models/product.model';
import { Review } from '@products/models/review';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  reviews: Review[];
  products$: Observable<Product[]>;

  constructor(
    public productService: ProductsService,
    public reviewsService: ProductsReviewsService,
    private cartService: CartService,
    private router: Router) {}

  ngOnInit() {
    this.products$ = this.productService.getAll();
    this.reviewsService.getAll().subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  ngOnDestroy() {
    this.router.navigate(['/', { outlets: { reviews: null } }]);
  }

  onBuy(value: Product) {
    this.productService.get(value.id).then((pr) => {
      if (pr && pr.count > 0) {
        this.cartService.add(new CartModel(pr.id, pr.name, pr.price, value.count, pr.count));
        this.productService.decreaseCount(value.id, value.count).then(() => {
          this.products$ = this.productService.getAll();
        });
      }
    });
  }

  onReviewOpened(id: string) {
    this.router.navigate([{ outlets: { reviews: [ id ] } }]);
  }

  reviewsCount(productId: string): number {
    return this.reviews ? this.reviews.filter(r => r.productId === productId).length : 0;
  }
}
