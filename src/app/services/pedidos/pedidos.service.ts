import { Injectable } from '@angular/core';
import { DetallePedido, Pedido } from '../../controllers/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  fieldArray: Array<DetallePedido> = [];
  newAttribute: DetallePedido;
  pedido: Pedido;
  cantidadItems: any = 0;

  constructor() { }

  agregarPedido(detallePedido: DetallePedido) {
    let filaNueva: DetallePedido = {
      idProducto: detallePedido.idProducto,
      cantidad: detallePedido.cantidad,
      precio_unidad: detallePedido.precio_unidad,
      subtotal: detallePedido.subtotal,
      desc: detallePedido.desc,
      producto: detallePedido.producto
    };

    let filaAuxiliar: DetallePedido = {
      idProducto: 0,
      cantidad: 0,
      precio_unidad: 0.00,
      subtotal: 0.00,
      desc: '',
      producto: ''
    }

    // Funcion para detectar productos repetidos y actualizar la cantidad con el arreglo existente
    if (this.fieldArray.findIndex(x => x.idProducto === detallePedido.idProducto) != -1) {
      let index = this.fieldArray.findIndex(x => x.idProducto === detallePedido.idProducto);

      filaAuxiliar.idProducto = this.fieldArray[index].idProducto;
      let cantidadNueva = (this.fieldArray[index].cantidad + detallePedido.cantidad);
      filaAuxiliar.cantidad = cantidadNueva;
      filaAuxiliar.precio_unidad = this.fieldArray[index].precio_unidad;
      filaAuxiliar.subtotal = (cantidadNueva * this.fieldArray[index].precio_unidad);
      filaAuxiliar.desc = this.fieldArray[index].desc;
      filaAuxiliar.producto = this.fieldArray[index].producto;

      // console.log(this.fieldArray[index]);
      // console.log(filaAuxiliar);
      this.fieldArray.splice(index, 1, filaAuxiliar);
    }
    else {
      // this.fieldArray.push
      this.fieldArray.push(filaNueva);
    }

    this.cantidadItems = this.fieldArray.length;
    // console.log(this.fieldArray);
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
