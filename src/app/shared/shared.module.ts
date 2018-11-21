import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatTabsModule, MatCardModule,
      MatButtonModule, MatToolbarModule, MatInputModule, MatListModule, MatIconModule } from '@angular/material';
import { HightlightDirective } from './hightlight.directive';
import { CounterComponent } from './counter/counter.component';
import { BorderDirective } from './border.directive';

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
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    HightlightDirective,
    BorderDirective,
    CounterComponent,
  ]
})
export class SharedModule { }
