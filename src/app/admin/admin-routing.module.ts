import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '@core/guard';
import { ManageOrdersComponent, ManageProductsComponent, AdminDashboardComponent } from './components';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'orders', component: ManageOrdersComponent },
          { path: 'products', component: ManageProductsComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

export const adminRouterComponents = [AdminComponent, AdminDashboardComponent, ManageOrdersComponent, ManageProductsComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
