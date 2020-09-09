import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import * as moment from 'moment';
import 'moment-timezone';
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

  constructor(private servicePedidos: PedidosService) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
      this.listaPedidos = this.servicePedidos.fieldArray;
      // const fechaMoment = moment().tz("America/Guatemala").format('YYYY-MM-DD HH:mm:ss');
      this.fecha = moment().tz("America/Guatemala").format('DD/MM/YYYY');
      this.cantidadItems = this.servicePedidos.cantidadItems;
      // console.log(fechaMoment);
    }
  }

  eliminarPedido(index){
    this.servicePedidos.deleteFieldValue(index);
    this.listaPedidos = this.servicePedidos.fieldArray;
    this.cantidadItems = this.servicePedidos.cantidadItems;
  }

  // cantidad?: number;
  // precio_unidad?: number;
  // subtotal?: number;
  // idProducto?: number;
  // producto?: string;
  // desc?: string;

}
