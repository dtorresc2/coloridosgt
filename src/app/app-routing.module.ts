import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { SinginComponent } from './routes/singin/singin.component';
import { AccountsComponent } from './routes/accounts/accounts.component';
import { ProductsComponent } from './routes/products/products.component';
import { UsersComponent } from './routes/users/users.component';
import { DashProductsComponent } from './views/products/dash-products/dash-products.component';
import { DetailProductsComponent } from './views/products/detail-products/detail-products.component';

const routes: Routes = [
  { path: '', redirectTo: 'singin', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'singin', component: SinginComponent },
  { path: 'accounts', component: AccountsComponent },
  {
    path: 'products', component: ProductsComponent,
    children: [
      { path: '', component: DashProductsComponent },
      { path: ':id', component: DetailProductsComponent }
    ]
  },
  { path: 'users', component: UsersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
