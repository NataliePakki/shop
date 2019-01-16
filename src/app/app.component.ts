import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { filter, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppSettingsService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(
    private appSetting: AppSettingsService,
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.setPageTitles();
    console.log('setting: ' + this.appSetting.getSetting());
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

  private setPageTitles() {
    this.sub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(
        data => {
          this.titleService.setTitle(data['title']);
        }
      );
  }
}
