import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import * as moment from 'moment';
import 'moment-timezone';
import { Router} from '@angular/router';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';
// https://stackoverflow.com/questions/38674835/how-to-include-moment-timezone-in-angular-2-app Link para incluir libreria de fechas

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  idUsuario: any;
  listaPedidos: any = [];
  fecha: any;
  cantidadItems: any = 0;
  totalPedido: any = 0.00;
  descuentoPedido: any = 0.00;

  constructor(private servicePedidos: PedidosService, private router: Router, private notificacionService: NotificacionService) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
      this.listaPedidos = this.servicePedidos.fieldArray;
      // const fechaMoment = moment().tz("America/Guatemala").format('YYYY-MM-DD HH:mm:ss');
      this.fecha = moment().tz("America/Guatemala").format('DD/MM/YYYY');
      this.cantidadItems = this.servicePedidos.cantidadItems;
      // console.log(fechaMoment);

      // array1.forEach(element => console.log(element));
      this.generarTotal();
    }
  }

  eliminarPedido(index) {
    this.servicePedidos.deleteFieldValue(index);
    this.listaPedidos = this.servicePedidos.fieldArray;
    this.cantidadItems = this.servicePedidos.cantidadItems;
    this.generarTotal();
    this.notificacionService.getToastSuccess('Elemento eliminado correctamente','');
  }

  generarTotal() {
    let total: any = 0;
    let descuento: any = 0;
    this.servicePedidos.fieldArray.forEach(element => {
      total += element.subtotal;
      descuento += element.descuento;
      // console.log(total);
    });
    this.totalPedido = total;
    this.descuentoPedido = descuento;
    this.totalPedido = parseFloat(this.totalPedido).toFixed(2);
    this.descuentoPedido = parseFloat(this.descuentoPedido).toFixed(2);
  }

  irCheckout() {
    this.router.navigate(['order/checkout']);
  }

  // cantidad?: number;
  // precio_unidad?: number;
  // subtotal?: number;
  // idProducto?: number;
  // producto?: string;
  // desc?: string;

}
