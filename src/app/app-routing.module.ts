import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './routes/shop/shop.component';
import { HomeComponent } from './routes/home/home.component';
import { AboutComponent } from './routes/about/about.component';
import { SinginComponent } from './routes/singin/singin.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'shop', component: ShopComponent },
  { path:'about', component: AboutComponent },
  { path:'singin', component: SinginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
