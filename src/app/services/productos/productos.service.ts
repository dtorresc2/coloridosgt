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
    return this.http.post(Servidor.API_URI + '/productos', producto , {
      headers: {'Content-Length': '54138'}
    });
  }
}
