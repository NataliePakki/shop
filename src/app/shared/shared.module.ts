import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAngularModule } from './mat-angular.module';

import { HightlightDirective } from './hightlight.directive';
import { CounterComponent } from './counter/counter.component';
import { BorderDirective } from './border.directive';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HightlightDirective,
    CounterComponent,
    BorderDirective,
    OrderByPipe
  ],
  exports: [
    MatAngularModule,
    HightlightDirective,
    BorderDirective,
    OrderByPipe,
    CounterComponent,
  ]
})
export class SharedModule { }
