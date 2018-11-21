import { InjectionToken } from '@angular/core';

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const Generator = new InjectionToken<string>('Generator');

export function GeneratorService(n: number) {
  return function() {
    let text = '';
    for (let i = 0; i < n; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
}
