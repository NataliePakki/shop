import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  private config: object;

  constructor() { }

  getConfig(): object {
    return this.config;
  }

  setCongig(config: object) {
    this.config = config;
  }
}
