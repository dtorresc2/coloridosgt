import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {
  idUsuario: any;
  idPedido: any;
  listaDetalle: any = [];

  constructor(private pedidosServicio:PedidosService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
    }

    if (this.activatedRoute.snapshot.params.id){
      this.idPedido = this.activatedRoute.snapshot.params.id;
      this.obtenerDetallePedido();
    }
  }

  obtenerDetallePedido() {
    this.pedidosServicio.obtenerDetallePedido(this.idPedido)
    .subscribe(
      res => {
        this.listaDetalle = res;
        console.log(res);
      },
      err => console.error(err)
    );
  }

}
