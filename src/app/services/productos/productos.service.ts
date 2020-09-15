import { Injectable } from '@angular/core';
import { Servidor } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    return this.http.get(Servidor.API_URI + '/productos/clientes');
  }

  obtenerProductoEspecifico(id) {
    return this.http.get(Servidor.API_URI + '/productos/' + id);
  }

  registrarVenta(_cantidad, _idproducto) {
    return this.http.post(Servidor.API_URI + '/productos/venta', { cantidad: _cantidad, idProducto: _idproducto });
  }

}
