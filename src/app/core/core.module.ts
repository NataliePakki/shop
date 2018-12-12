import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersAPIProvider, ProductsAPIProvider, ReviewAPIProvider } from 'assets/app.config';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [],
  providers: [
    OrdersAPIProvider,
    ProductsAPIProvider,
    ReviewAPIProvider
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);    }
  }
}

