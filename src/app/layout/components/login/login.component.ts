import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setMessage();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onLogin() {
    this.authService
      .login()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
       () => {
         this.setMessage();
         if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };
          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
      }
    },
        err => console.log(err)
    );
  }

  onLogout() {
      this.authService.logout();
      this.setMessage();
  }

  private setMessage() {
      this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
}
