import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '@core/guard/can-deactivate.guard';
import { OrderGuard } from './guards/order.guard';
import { ShipmentComponent, SuccessPageComponent } from './components';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [ OrderGuard ],
    children: [
      {
        path: 'checkout',
        component: ShipmentComponent,
        canDeactivate: [ CanDeactivateGuard ],
        data: { title: 'CheckOut' }

      },
      {
        path: 'success-page',
        component: SuccessPageComponent,
        data: { title: 'Success' }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
