import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { CoreServicesModule } from '@core/core-services.module';

@Injectable({
  providedIn: CoreServicesModule
})
export class AuthService {
  isLoggedIn = false;

  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true)
      .pipe(
        delay(1000),
        tap(val => this.isLoggedIn = val)
      );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
