import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosService } from '../../services/productos/productos.service';

@Injectable({
   providedIn: 'root'
})

export class ProductResolver implements Resolve<Observable<any>> {
   constructor(private clientService: ProductosService, private activatedRoute: ActivatedRoute) {}
   
   resolve() {
      return this.clientService.obtenerProductos();
   }
}