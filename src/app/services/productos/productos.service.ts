import { Injectable } from '@angular/core';
import { Servidor } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/controllers/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    return this.http.get(Servidor.API_URI + '/productos');
  }

  registrarProducto(producto: Producto) {
    return this.http.post(Servidor.API_URI + '/productos', producto);
  }

  editarProducto(id, img, producto: Producto) {
    return this.http.put(Servidor.API_URI + '/productos/' + id + '/imagen/' + img, producto);
  }

  eliminarProducto(producto: Producto) {
    // return this.http.put(Servidor.API_URI + '/productos', { id: ID, key: URLkey });
    return this.http.put(Servidor.API_URI + '/productos', producto);
  }

  registrarCantidadProducto(id, costo, cant, user) {
    return this.http.post(Servidor.API_URI + '/productos/compra',
      { precioUnitario: costo, cantidad: cant, idusuario: user, idProducto: id });
  }

  obtenerKardex(idProducto) {
    return this.http.get(Servidor.API_URI + '/productos/' + idProducto + '/kardex');
  }
}

// {
//   "cantidad": 15,
//   "precioUnitario": 21,
//   "idProducto": 20,
//   "idusuario": 10
// }