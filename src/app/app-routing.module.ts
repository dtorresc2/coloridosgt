import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { SinginComponent } from './routes/singin/singin.component';
import { AccountsComponent } from './routes/accounts/accounts.component';
import { ProductsComponent } from './routes/products/products.component';
import { UsersComponent } from './routes/users/users.component';
import { DashProductsComponent } from './views/products/dash-products/dash-products.component';
import { DetailProductsComponent } from './views/products/detail-products/detail-products.component';
import { DashUsersComponent } from './views/users/dash-users/dash-users.component';
import { BitacoraUsersComponent } from './views/users/bitacora-users/bitacora-users.component';
import { OrdersComponent } from './routes/orders/orders.component';

import { GuardPermitsGuard } from './guards/guard-permits.guard';

import { ProductResolver } from './functions/products.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'singin', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'singin', component: SinginComponent },
  { path: 'accounts', component: AccountsComponent, canActivate: [GuardPermitsGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [GuardPermitsGuard] },
  {
    path: 'products', component: ProductsComponent, canActivate: [GuardPermitsGuard],
    children: [
      { path: '', component: DashProductsComponent, resolve: { products: ProductResolver } },
      { path: ':id', component: DetailProductsComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  {
    path: 'users', component: UsersComponent, canActivate: [GuardPermitsGuard],
    children: [
      { path: '', component: DashUsersComponent },
      { path: ':id/log', component: BitacoraUsersComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
