import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './routes/shop/shop.component';
import { HomeComponent } from './routes/home/home.component';
import { AboutComponent } from './routes/about/about.component';
import { SingupComponent } from './routes/singup/singup.component';
import { SinginComponent } from './routes/singin/singin.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { OrderComponent } from './routes/order/order.component';
import { CartComponent } from './views/order/cart/cart.component';
import { OrdersComponent } from './views/order/orders/orders.component';
import { LogComponent } from './routes/log/log.component';
import { AuthGuard } from './guards/auth.guard';
import { CartFormComponent } from './views/order/cart-form/cart-form.component';

import { ShopResolver } from './resolvers/shop.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'shop', component: ShopComponent, resolve: { shop: ShopResolver } },
  // { path: 'shop', component: ShopComponent },
  { path: 'about', component: AboutComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'singin', component: SinginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'log', component: LogComponent, canActivate: [AuthGuard] },
  {
    path: 'order', component: OrderComponent, canActivateChild: [AuthGuard],
    children: [
      { path: '', component: CartComponent },
      { path: 'list', component: OrdersComponent },
      { path: 'checkout', component: CartFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
