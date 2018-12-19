import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route,
    ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@core/+store';
import * as RouterActions from '@store/router';

import { AuthService } from './../services/auth.service';
import { CoreServicesModule } from '@core/core-services.module';

@Injectable({
  providedIn: CoreServicesModule
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const { url } = state;
    return this.checkLogin(url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const { url } = state;
    return this.checkLogin(url);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    this.authService.redirectUrl = url;

    this.store.dispatch(new RouterActions.Go({ path: ['/login'] }));
    return false;
  }
}
