import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from '@products/models/product.model';
import { CoreServicesModule } from '@core/core-services.module';
import { HttpService } from '@shared/services/http-service.service';
import { productsAPI } from 'assets/app.config';

@Injectable({
  providedIn: CoreServicesModule
})
export class ProductsService {
  private httpService: HttpService;
  constructor(@Inject(productsAPI) private productsUrl, httpClient: HttpClient) {
    this.httpService = new HttpService(httpClient);
    this.httpService.setBaseUrl(this.productsUrl);
  }
  getAll(): Observable<Product[]> {
    return this.httpService.getAll<Product>();
  }

  get(id: string): Promise<Product> {
    return this.httpService.get<Product>(id);
  }

  add(product: Product, count?: number): Promise<Product> {
    const newProduct = {...product, count: count || product.count || 1 };
    return this.httpService.post<Product>(newProduct);
  }

  update(product: Product): Promise<Product> {
    return this.httpService.put<Product>(product);
  }

  adjustCount(id: string, count: number): Promise<Product> {
    return this.get(id).then(product => {
      return this.update({...product, lastUpdated: new Date(), count: +product.count + count });
    });
  }

  remove(item: Product): Promise<Product> {
    return this.httpService.delete(item);
  }
}
