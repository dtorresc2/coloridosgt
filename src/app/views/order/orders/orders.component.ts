import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  idUsuario: any;
  listaPedidos: any = [];

  page = 1;
  pageSize = 10;

  constructor(private pedidosServicio: PedidosService, private router: Router) { }

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

  verDetalle(id) {
    this.router.navigate(['order/list', id, 'detail']);
  }

}
