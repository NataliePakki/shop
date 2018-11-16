import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatTabsModule, MatCardModule,
      MatButtonModule, MatToolbarModule, MatInputModule, MatListModule, MatIconModule } from '@angular/material';
import { HightlightDirective } from './hightlight.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HightlightDirective
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
  ]
})
export class SharedModule { }
