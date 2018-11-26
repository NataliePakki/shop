import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HightlightDirective } from './hightlight.directive';
import { CounterComponent } from './counter/counter.component';
import { BorderDirective } from './border.directive';
import { MatAngularModule } from './mat-angular.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HightlightDirective,
    CounterComponent,
    BorderDirective
  ],
  exports: [
    MatAngularModule,
    HightlightDirective,
    BorderDirective,
    CounterComponent,
  ]
})
export class SharedModule { }
