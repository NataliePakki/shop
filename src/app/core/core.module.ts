import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ordersReducer, OrdersEffects } from '@store/orders';
import { productsReviewsReducer, ProductsReviewsEffects } from '@store/products-reviews';
import { productsReducer, ProductsEffects } from '@store/products';

import { CoreStoreModule } from '@store/core-store.module';
import { OrdersAPIProvider, ProductsAPIProvider, ReviewAPIProvider } from 'assets/app.config';
import { CoreServicesModule } from './core-services.module';

@NgModule({
  imports: [
    CommonModule,
    CoreStoreModule,
    CoreServicesModule,
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('products-reviews', productsReviewsReducer),
    StoreModule.forFeature('orders', ordersReducer),
    EffectsModule.forFeature([ProductsEffects, ProductsReviewsEffects, OrdersEffects])
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

