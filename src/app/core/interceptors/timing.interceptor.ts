import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let start;
    if (req.url.includes('products')) {
      start = performance.now();
    }
    return next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response
            if (event.url.includes('products')) {
              console.log('took ' + (performance.now() - start) + 'ms');
            }
          }
          return event;
        })
      );
  }
}
