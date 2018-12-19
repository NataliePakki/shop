import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from './../interfaces/can-component-deactivate.interface';
import { CoreServicesModule } from '@core/core-services.module';

@Injectable({
  providedIn: CoreServicesModule
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
