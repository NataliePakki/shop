import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent, ProductReviewsComponent, ProductFormComponent } from './components';
import { AuthGuard } from '@core/guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products' }
  },
  {
    path: 'add',
    component: ProductFormComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'edit/:productID',
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':productID',
    component: ProductReviewsComponent,
    outlet: 'reviews'
  },
];
export const productsRouterComponents = [ProductsComponent, ProductFormComponent, ProductFormComponent, ProductReviewsComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
