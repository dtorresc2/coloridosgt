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

  // Funciones para el carrito  =============================
  agregarPedido(detallePedido: DetallePedido) {
    let filaNueva: DetallePedido = {
      idProducto: detallePedido.idProducto,
      cantidad: detallePedido.cantidad,
      precio_unidad: detallePedido.precio_unidad,
      subtotal: detallePedido.subtotal,
      desc: detallePedido.desc,
      producto: detallePedido.producto,
      descuento: detallePedido.descuento
    };

    let filaAuxiliar: DetallePedido = {
      idProducto: 0,
      cantidad: 0,
      precio_unidad: 0.00,
      subtotal: 0.00,
      desc: '',
      producto: '',
      descuento: 0.00
    }

    // Funcion para detectar productos repetidos y actualizar la cantidad con el arreglo existente
    if (this.fieldArray.findIndex(x => x.idProducto === detallePedido.idProducto) != -1) {
      let index = this.fieldArray.findIndex(x => x.idProducto === detallePedido.idProducto);

      filaAuxiliar.idProducto = this.fieldArray[index].idProducto;
      let cantidadNueva = (this.fieldArray[index].cantidad + detallePedido.cantidad);
      filaAuxiliar.cantidad = cantidadNueva;
      filaAuxiliar.precio_unidad = this.fieldArray[index].precio_unidad;
      filaAuxiliar.subtotal = this.fieldArray[index].descuento > 0 ? (cantidadNueva * (this.fieldArray[index].precio_unidad - this.fieldArray[index].descuento)) : (cantidadNueva * this.fieldArray[index].precio_unidad);
      filaAuxiliar.desc = this.fieldArray[index].desc;
      filaAuxiliar.producto = this.fieldArray[index].producto;

      filaAuxiliar.descuento = this.fieldArray[index].descuento * cantidadNueva;

      this.fieldArray.splice(index, 1, filaAuxiliar);
    }
    else {
      this.fieldArray.push(filaNueva);
    }

    this.cantidadItems = this.fieldArray.length;

    // localStorage.setItem('pedido', JSON.stringify(this.fieldArray.toString()));
    // console.log(JSON.parse(localStorage.getItem('pedido')));
    // localStorage.removeItem('pedido');
  }

  crearPedidoGeneral() {
    this.pedido.detalle_pedido = this.fieldArray;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    this.cantidadItems = this.fieldArray.length;
    // this.fieldArray.findIndex();
  }

  // PETICIONES HTTP =======================

}
