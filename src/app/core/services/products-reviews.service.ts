import { Injectable } from '@angular/core';

import { Review } from '@products/models/review';
import { CoreModule } from '@core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class ProductsReviewsService {
  private reviews: Review[] = [
    new Review('2', 'some anonimus', 'very good', 5, new Date()),
    new Review('3', 'batman', 'good', 4, new Date()),
    new Review('2', 'spy', 'bad', 2, new Date())
  ];
  constructor() { }

  getAll(): Review[] {
    return this.reviews;
  }

  get(productId: string): Review[] | null {
    return this.reviews.filter(r => r.productId === productId);
  }

  add(review: Review): void {
    this.reviews.push(review);
  }

  update(review: Review): void {
    const i = this.reviews.findIndex(o => o.id === review.id);

    if (i > -1) {
      this.reviews.splice(i, 1, review);
    }
  }

  remove(id: string): void {
    const i = this.reviews.findIndex(p => p.productId === id);

    if (i > -1) {
      this.reviews.splice(i, 1);
    }
  }
}
