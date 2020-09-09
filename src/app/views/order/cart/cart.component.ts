import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  idUsuario: any;
  listaPedidos: any = [];

  constructor(private servicePedidos: PedidosService) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
      this.listaPedidos = this.servicePedidos.fieldArray;
    }
  }

  eliminarPedido(index){
    this.servicePedidos.deleteFieldValue(index);
    this.listaPedidos = this.servicePedidos.fieldArray;
  }

  // cantidad?: number;
  // precio_unidad?: number;
  // subtotal?: number;
  // idProducto?: number;
  // producto?: string;
  // desc?: string;

}
