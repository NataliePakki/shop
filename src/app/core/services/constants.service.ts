import { InjectionToken } from '@angular/core';

export const CONSTANTS = new InjectionToken<ConstantsService>('constants');

export interface ConstantsService {
  App: string;
  Ver: string;
}
