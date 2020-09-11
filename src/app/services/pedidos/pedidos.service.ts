import { Injectable } from '@angular/core';
import { DetallePedido, Pedido } from '../../controllers/pedido';
import { HttpClient } from '@angular/common/http';
import { Servidor } from 'src/app/config/config';
import { ClienteActualizacion } from 'src/app/controllers/cliente';
import { ProductosService } from '../productos/productos.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  fieldArray: Array<DetallePedido> = [];
  newAttribute: DetallePedido;

  pedido: Pedido = {
    fecha: '',
    direccion: '',
    descuento: 0.00,
    total: 0.00,
    url_comprobante: 'www.s3.coloridosgt.com',
    idtipo_pedido: 0,
    idcliente: 0,
    idestado_pedido: 0,
    idusuario: 0,
    detalle_pedido: new Array<DetallePedido>()
  }

  cantidadItems: any = 0;

  constructor(private http: HttpClient) { }

  // Funciones para el carrito  =============================
  agregarPedido(detallePedido: DetallePedido) {
    let filaNueva: DetallePedido = {
      idproducto: detallePedido.idproducto,
      cantidad: detallePedido.cantidad,
      precio_unidad: detallePedido.precio_unidad,
      subtotal: detallePedido.subtotal,
      descripcion: detallePedido.descripcion,
      producto: detallePedido.producto,
      descuento: detallePedido.descuento
    };

    let filaAuxiliar: DetallePedido = {
      idproducto: 0,
      cantidad: 0,
      precio_unidad: 0.00,
      subtotal: 0.00,
      descripcion: '',
      producto: '',
      descuento: 0.00
    }

    // Funcion para detectar productos repetidos y actualizar la cantidad con el arreglo existente
    if (this.fieldArray.findIndex(x => x.idproducto === detallePedido.idproducto) != -1) {
      let index = this.fieldArray.findIndex(x => x.idproducto === detallePedido.idproducto);

      filaAuxiliar.idproducto = this.fieldArray[index].idproducto;
      let cantidadNueva = (this.fieldArray[index].cantidad + detallePedido.cantidad);
      filaAuxiliar.cantidad = cantidadNueva;
      filaAuxiliar.precio_unidad = this.fieldArray[index].precio_unidad;
      filaAuxiliar.subtotal = this.fieldArray[index].descuento > 0 ? (cantidadNueva * (this.fieldArray[index].precio_unidad - this.fieldArray[index].descuento)) : (cantidadNueva * this.fieldArray[index].precio_unidad);
      filaAuxiliar.descripcion = this.fieldArray[index].descripcion;
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

  crearPedidoGeneral(direccion, fecha, idtipo, idcliente, total, descuento) {
    

    console.log(total, '-', descuento);

    this.pedido.direccion = direccion;
    this.pedido.fecha = fecha;
    this.pedido.total = total;
    this.pedido.descuento = descuento;
    this.pedido.idtipo_pedido = idtipo;
    this.pedido.idcliente = idcliente;
    this.pedido.idestado_pedido = 1;
    this.pedido.idusuario = 1;
    this.pedido.detalle_pedido = this.fieldArray;
    // console.log(fecha, '-', direccion, '-', descuento, '-', total, '-', idtipo, '-', idcliente, '-',  1);
    // console.log(this.pedido.detalle_pedido);
    console.log(this.pedido);
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    this.cantidadItems = this.fieldArray.length;
    // this.fieldArray.findIndex();
  }

  // PETICIONES HTTP =======================
  obtenerTiposEnvio() {
    return this.http.get(Servidor.API_URI + '/tipoPedido');
  }

  registrarPedido(pedido: Pedido) {
    return this.http.post(Servidor.API_URI + '/tipoPedido', pedido);
  }

}
