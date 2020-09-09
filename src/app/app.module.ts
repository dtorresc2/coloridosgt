import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './routes/shop/shop.component';
import { HomeComponent } from './routes/home/home.component';
import { AboutComponent } from './routes/about/about.component';
import { SingupComponent } from './routes/singup/singup.component';
import { SinginComponent } from './routes/singin/singin.component';

import { ClientsService } from './services/clientes/clients.service';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { OrderComponent } from './routes/order/order.component';
import { CartComponent } from './views/order/cart/cart.component';
import { OrdersComponent } from './views/order/orders/orders.component';
import { LogComponent } from './routes/log/log.component';
import { CartFormComponent } from './views/order/cart-form/cart-form.component';
import { LoaderComponent } from './components/loader/loader.component'
import { ProductosService } from './services/productos/productos.service';
import { PedidosService } from './services/pedidos/pedidos.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShopComponent,
    HomeComponent,
    AboutComponent,
    SingupComponent,
    SinginComponent,
    DashboardComponent,
    OrderComponent,
    CartComponent,
    OrdersComponent,
    LogComponent,
    CartFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ClientsService,
    ProductosService,
    PedidosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
