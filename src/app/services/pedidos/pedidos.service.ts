import { Injectable } from '@angular/core';
import { DetallePedido, Pedido } from '../../controllers/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  fieldArray: Array<DetallePedido> = [];
  newAttribute: DetallePedido = {};
  pedido: Pedido;
  cantidadItems: any = 0;

  constructor() { }

  agregarPedido(detallePedido: DetallePedido) {
    //console.log("Envie un pedido")
    // this.newAttribute = {
    //   desc : descripcion,
    //   subtot : subtotal
    // };
    this.fieldArray.push(detallePedido);
    this.cantidadItems = this.fieldArray.length;
  }

  crearPedidoGeneral() {
    this.pedido.detalle_pedido = this.fieldArray;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    this.cantidadItems = this.fieldArray.length;
    // this.fieldArray.findIndex();
  }

}
