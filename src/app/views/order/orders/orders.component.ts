import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  idUsuario: any;
  listaPedidos: any = [];

  constructor(private pedidosServicio:PedidosService) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
    }
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidosServicio.obtenerPedidosCliente(this.idUsuario)
    .subscribe(
      res => {
        this.listaPedidos = res;
      },
      err => console.error(err)
    );
  }

}
