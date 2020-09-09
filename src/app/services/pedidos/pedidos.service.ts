import { Injectable } from '@angular/core';
import { DetallePedido, Pedido } from '../../controllers/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  fieldArray: Array<DetallePedido> = [];
  newAttribute: DetallePedido = {};
  pedido: Pedido;

  constructor() { }

  agregarPedido(detallePedido: DetallePedido) {
    //console.log("Envie un pedido")
    // this.newAttribute = {
    //   desc : descripcion,
    //   subtot : subtotal
    // };
    this.fieldArray.push(detallePedido);
  }

  crearPedidoGeneral() {
    this.pedido.detalle_pedido = this.fieldArray;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

}
