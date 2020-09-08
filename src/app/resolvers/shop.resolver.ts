import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductosService } from '../services/productos/productos.service';

@Injectable({
   providedIn: 'root'
})

export class ShopResolver implements Resolve<Observable<any>> {
   constructor(private productoService: ProductosService) {}
   
   resolve() {
      // return of ('Hola');
      return this.productoService.obtenerProductos();
      // .pipe(
      //    delay(2000)
      // );
   }
}