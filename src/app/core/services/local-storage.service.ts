import { Injectable } from '@angular/core';

import { CoreModule } from '@core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));

  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
