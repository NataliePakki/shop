import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule, productsRouterComponents } from './products-routing.module';

import { ProductComponent, ProductReviewComponent } from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    productsRouterComponents,
    ProductReviewComponent,
    ProductComponent
  ]
})
export class ProductsModule { }
