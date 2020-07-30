import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './routes/shop/shop.component';
import { HomeComponent } from './routes/home/home.component';
import { AboutComponent } from './routes/about/about.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'shop', component: ShopComponent },
  { path:'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
