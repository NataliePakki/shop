import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';

import { ShipmentComponent, SuccessPageComponent } from './components';
import { OrderComponent } from './order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    OrderRoutingModule
  ],
  declarations: [ OrderComponent, ShipmentComponent, SuccessPageComponent ]
})
export class OrderModule { }
