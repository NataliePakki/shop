import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from '@order/models/order.model';
import { CoreModule } from '@core/core.module';
import { HttpService } from '@shared/services/http-service.service';
import { ordersAPI } from 'assets/app.config';

@Injectable({
  providedIn: CoreModule
})
export class OrdersService {
  private httpService: HttpService;
  constructor(@Inject(ordersAPI) private ordersUrl, httpClient: HttpClient) {
    this.httpService = new HttpService(httpClient);
    this.httpService.setBaseUrl(this.ordersUrl);
  }
  getAll(): Observable<Order[]> {
    return this.httpService.getAll<Order>();
  }

  get(id: string): Promise<Order> {
    return this.httpService.get<Order>(id);
  }

  add(order: Order): Promise<Order> {
    return this.httpService.post<Order>(order);
  }

  update(order: Order): Promise<Order> {
    return this.httpService.put<Order>(order);
  }

  remove(item: Order): Promise<Order> {
    return this.httpService.delete(item);
  }
}
