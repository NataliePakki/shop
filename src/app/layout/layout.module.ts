import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathNotFoundComponent, LoginComponent, HeaderComponent } from './components';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    PathNotFoundComponent,
    LoginComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]

})
export class LayoutModule { }
