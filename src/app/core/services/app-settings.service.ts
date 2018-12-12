import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';

const defaultSetting = {
  appVersion: '1.0'
};

@Injectable({
  providedIn: CoreModule
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
