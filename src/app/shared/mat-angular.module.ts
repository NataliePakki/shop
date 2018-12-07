import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule, MatTabsModule, MatCardModule,
  MatButtonModule, MatToolbarModule, MatInputModule,
  MatListModule, MatIconModule, MatSelectModule, MatOptionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class MatAngularModule { }
