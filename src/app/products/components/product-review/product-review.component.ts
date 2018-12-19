import { Component, OnInit, Input } from '@angular/core';

import { Review } from '@products/models/review';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  @Input() review: Review;
  constructor() { }

  ngOnInit() {
  }

}
