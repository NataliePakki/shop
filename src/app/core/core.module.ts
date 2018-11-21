import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { CONSTANTS, Generator, GeneratorService } from './services';

@NgModule({
  imports: [
    CommonModule,

    SharedModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [
    { provide: CONSTANTS, useValue: { App: 'ShopApplication', Ver: '1.0' } },
    { provide: Generator, useFactory: GeneratorService(10) },
  ],
})
export class CoreModule { }
