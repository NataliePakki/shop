import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '@shared/shared.module';

import { CartComponent, CartItemComponent } from './components';

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    CartRoutingModule
  ],
  declarations: [
    CartComponent,
    CartItemComponent
  ]
})
export class CartModule { }
