import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Review } from '@products/models/review';
import { reviewsAPI } from 'assets/app.config';
import { HttpService } from '@shared/services/http-service.service';
import { CoreServicesModule } from '@core/core-services.module';

@Injectable({
  providedIn: CoreServicesModule
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

  add(review: Review): Promise<Review> {
    return this.httpService.post<Review>(review);
  }

  update(review: Review): Promise<Review> {
    return this.httpService.put<Review>(review);
  }

  remove(review: Review): Promise<Review> {
    return this.httpService.delete<Review>(review);
  }
}
