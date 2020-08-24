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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'about', component: AboutComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'singin', component: SinginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'log', component: LogComponent },
  {
    path: 'order', component: OrderComponent,
    children: [
      { path: '', component: CartComponent },
      { path: 'list', component: OrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
