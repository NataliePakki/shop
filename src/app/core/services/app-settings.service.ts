import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from './local-storage.service';
import { CoreServicesModule } from '@core/core-services.module';

const defaultSetting = {
  appVersion: '1.0'
};

@Injectable({
  providedIn: CoreServicesModule
})
export class AppSettingsService {
  private settings;
  constructor(localStorage: LocalStorageService, http: HttpClient) {
    this.settings = localStorage.getItem('app-settings');
    if (!this.settings) {
      http.get('./assets/app-setting.json').subscribe((result: string) => {
        if (result) {
          this.settings = result;
        } else {
          this.settings = defaultSetting;
        }
        localStorage.setItem('app-settings', this.settings);
      }, () => {
        this.settings = defaultSetting;
        localStorage.setItem('app-settings', this.settings);
      });
    }
  }
  getSetting(): any {
    return this.settings;
  }
}
