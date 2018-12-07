import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { ProductsModule } from '@products/products.module';
import { AppRoutingModule } from './app-routing.module';
import { CartModule } from '@cart/cart.module';
import { OrderModule } from '@order/order.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,

    SharedModule,
    LayoutModule,
    CoreModule,
    ProductsModule,
    CartModule,
    OrderModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
