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
import { ProductsComponent } from './routes/products/products.component';
import { AccountsComponent } from './routes/accounts/accounts.component';
import { UsersComponent } from './routes/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SinginComponent,
    FooterComponent,
    ProductsComponent,
    AccountsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
