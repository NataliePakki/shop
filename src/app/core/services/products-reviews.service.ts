import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Review } from '@products/models/review';
import { CoreModule } from '@core/core.module';
import { ordersAPI, reviewsAPI } from 'assets/app.config';
import { HttpService } from '@shared/services/http-service.service';

@Injectable({
  providedIn: CoreModule
})
export class ProductsReviewsService {
  private httpService: HttpService;

  constructor(@Inject(reviewsAPI) reviewsUrl: string, httpClient: HttpClient) {
    this.httpService = new HttpService(httpClient);
    this.httpService.setBaseUrl(reviewsUrl);
  }

  getAll(): Observable<Review[]> {
    return this.httpService.getAll<Review>();
  }

  get(productId: string): Promise<Review[]> {
    return this.getAll().toPromise().then(reviews => reviews.filter(r => r.productId === productId));
  }

  add(review: Review): void {
    this.httpService.post<Review>(review);
  }

  update(review: Review): void {
    this.httpService.put<Review>(review);
  }

  remove(review: Review): void {
    this.httpService.delete<Review>(review);
  }
}
