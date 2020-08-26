import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './routes/home/home.component';
import { SinginComponent } from './routes/singin/singin.component';
import { FooterComponent } from './components/footer/footer.component';

import { UsersService } from './services/usuarios/users.service';
import { CategoriasService } from './services/productos/categorias.service';
import { ProductosService } from './services/productos/productos.service';

import { ProductsComponent } from './routes/products/products.component';
import { AccountsComponent } from './routes/accounts/accounts.component';
import { UsersComponent } from './routes/users/users.component';
import { DashProductsComponent } from './views/products/dash-products/dash-products.component';
import { DetailProductsComponent } from './views/products/detail-products/detail-products.component';
import { DashUsersComponent } from './views/users/dash-users/dash-users.component';
import { BitacoraUsersComponent } from './views/users/bitacora-users/bitacora-users.component';
import { OrdersComponent } from './routes/orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SinginComponent,
    FooterComponent,
    ProductsComponent,
    AccountsComponent,
    UsersComponent,
    DashProductsComponent,
    DetailProductsComponent,
    DashUsersComponent,
    BitacoraUsersComponent,
    OrdersComponent
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
    UsersService,
    CategoriasService,
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
