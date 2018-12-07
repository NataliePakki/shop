import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route,
    ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(
    private authService: AuthService,
    private router: Router
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

    this.router.navigate(['/login']);
    return false;
  }
}
