import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { PathNotFoundComponent, LoginComponent } from './layout';
import { AuthGuard } from '@core/guard';



const routes: Routes = [
    {
      path: 'admin',
      canLoad: [AuthGuard],
      loadChildren: './admin/admin.module#AdminModule',
      data: { title: 'Admin' }
    },
    {
      path: 'login',
      component: LoginComponent,
      data: { title: 'Login' }
    },
    {
      path: '',
      redirectTo: '/products',
      pathMatch: 'full'
    },
    {
      // The router will match this route if the URL requested
      // doesn't match any paths for routes defined in our configuration
      path: '**',
      component: PathNotFoundComponent,
      data: { title: '404' }
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
