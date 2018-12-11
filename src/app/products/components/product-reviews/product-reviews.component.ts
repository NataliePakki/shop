import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';

import { ProductsService, ProductsReviewsService } from '@core/services';
import { Review } from '@products/models/review';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent implements OnInit {
  public reviews: Review[] = [];
  public name: string;

  constructor(
    private productsService: ProductsService,
    public reviewsService: ProductsReviewsService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params) => this.productsService.get(params.productID)))
    .subscribe((product) => {
      this.reviews = this.reviewsService.get(product.id);
      this.name = product.name;
    });
  }

  onClose() {
    this.router.navigate(['/', { outlets: { reviews: null } }]);  }
}
