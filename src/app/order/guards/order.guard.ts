import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@core/+store';
import * as RouterActions from '@store/router';

import { CartService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.cartService.isSubmitted() || this.cartService.getCount() === 0) {
      this.store.dispatch(new RouterActions.Go({ path: ['/products'] }));
      return false;
    }
    return true;
  }
}
