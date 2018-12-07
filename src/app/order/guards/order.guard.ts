import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CartService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.cartService.isSubmitted() || this.cartService.getCount() === 0) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
