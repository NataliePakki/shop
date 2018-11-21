import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CartComponent } from '@cart/cart.component';
import { CartItemComponent } from '@cart/cart-item/cart-item.component';
import { ProductsComponent } from '@products/products.component';
import { ProductComponent } from '@products/product/product.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CartItemComponent,
    ProductsComponent,
    ProductComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,

    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
