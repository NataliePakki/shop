import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';

import { ProductsService, ProductsReviewsService } from '@core/services';
import { Review } from '@products/models/review';

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
    this.route.params.subscribe((params) => {
      this.productsService.get(params.productID).then((pr) => {
        this.reviews = this.reviewsService.get(params.productID);
        this.name = pr.name;
      });
    });
  }

  onClose() {
    this.router.navigate(['/', { outlets: { reviews: null } }]);  }
}
