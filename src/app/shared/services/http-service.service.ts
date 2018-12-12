import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Identity } from '@core/interfaces/identity.interface';

export class HttpService {
  private baseUrl;
  constructor(
    private http: HttpClient) { }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAll<T>(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  get<T>(id: string = null): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<T>(url).toPromise();
  }

  post<T>(item: T): Promise<T> {
    const url = this.baseUrl,
        body = JSON.stringify(item),
        options = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    return this.http
      .post<T>(url, body, options).toPromise();
  }

  put<T extends Identity>(item: T): Promise<T> {
    const url = `${this.baseUrl}/${item.id}`,
      body = JSON.stringify(item),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      return this.http
        .put<T>(url, body, options).toPromise();
  }

  delete<T extends Identity>(item: T): Promise<T> {
    const url = `${this.baseUrl}/${item.id}`;

    return this.http.delete<T>(url).toPromise();
  }
}
