import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servidor } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  obtenerTiposCategoria() {
    return this.http.get(Servidor.API_URI + '/tipoPedido');
  }

  obtenerEstadosCategoria() {
    return this.http.get(Servidor.API_URI + '/estadoPedido');
  }

  obtenerPedidos() {
    return this.http.get(Servidor.API_URI + '/pedidos');
  }

  obtenerDetallePedido(id) {
    return this.http.get(Servidor.API_URI + '/pedidos/' + id);
  }

  actualizarEstadoPedido(id, _idestado, _idusuario) {
    return this.http.put(Servidor.API_URI + '/pedidos/' + id + '/estado', { idestado_pedido: _idestado, usuario: _idusuario });
  }

  actualizarEmpleadoPedido(id, _idempleado, _idusuario) {
    return this.http.put(Servidor.API_URI + '/pedidos/' + id + '/empleado', { idusuario: _idempleado, usuario: _idusuario });
  }
}
