import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/productos/categorias.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { NotificacionService } from 'src/app/services/toasts/toasts.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ID: any;
  idUsuario: any;

  listaEmpleados: any = [];
  listaEstados: any = [];
  listaTipos: any = [];
  listaPedidos: any = [];
  listaDetallePedido: any = [];

  idDetallePedidoAUX: any;
  idPedidoAux: any;
  urlCompAux: any;
  seleccionado: boolean = false;

  nombreCliente: any = "-";
  direccionPedido: any = "-";
  idEmpleado: any = 1;
  idTipoPedido: any = 1;
  idEstadoPedido: any = 1;
  numProductos: any = 0;
  totalPedido: any = 0.00;
  fechaAUX: any = "-";
  idPedido_AUX: any = 0;

  page = 1;
  pageSize = 10;


  constructor(
    private modalService: NgbModal,
    private usersService: UsersService,
    private pedidoService: PedidosService,
    private router: Router,
    private notifiacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }

    // this.idEmpleado = 10;

    this.obtenerListaEmpleados();
    this.obtenerListaEstados();
    this.obtenerListaTipos();
    this.obtenerListaPedidos();
  }

  abrirDetallePedido(longContent, id) {
    this.modalService.open(longContent, { scrollable: true, size: 'lg', centered: true });
    // console.log(id);
    this.idDetallePedidoAUX = id;
    this.obtenerListaDetallePedido(id);
  }

  abrirModalPedido(content, id, url) {
    this.idPedidoAux = id;
    this.urlCompAux = url;
    this.modalService.open(content, { centered: true });
  }

  obtenerListaEmpleados() {
    this.usersService.obtenerUsuarios()
      .subscribe(
        res => {
          this.listaEmpleados = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  obtenerListaEstados() {
    this.pedidoService.obtenerEstadosCategoria()
      .subscribe(
        res => {
          this.listaEstados = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  obtenerListaTipos() {
    this.pedidoService.obtenerTiposCategoria()
      .subscribe(
        res => {
          this.listaTipos = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  obtenerListaPedidos() {
    this.pedidoService.obtenerPedidos()
      .subscribe(
        res => {
          this.listaPedidos = res;
          console.log(res);
        },
        err => console.error(err)
      )
  }

  obtenerListaDetallePedido(id) {
    this.pedidoService.obtenerDetallePedido(id)
      .subscribe(
        res => {
          this.listaDetallePedido = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  enlazarPedido(pedido) {
    // console.log((<any>pedido).tipo);
    // this.idPedidoAux = (<any>pedido).idpedido;
    this.nombreCliente = (<any>pedido).cliente;
    this.direccionPedido = (<any>pedido).direccion;
    this.idEmpleado = (<any>pedido).idusuario;
    this.idTipoPedido = (<any>pedido).idTipo;
    this.idEstadoPedido = (<any>pedido).idestado_pedido
    this.fechaAUX = (<any>pedido).fecha;
    this.idPedido_AUX = (<any>pedido).idpedido;
    this.totalPedido = parseFloat((<any>pedido).total).toFixed(2);
    this.numProductos = (<any>pedido).items;
    this.seleccionado = true;
  }

  onChangeEmpleado(idEmpleadoAux) {
    // console.log(idEmpleadoAux);

    if (this.seleccionado) {
      this.pedidoService.actualizarEmpleadoPedido(this.idPedido_AUX, idEmpleadoAux, this.idUsuario)
        .subscribe(
          res => {
            this.obtenerListaPedidos();
            this.notifiacionService.getToastSuccess('Empleado asignado correctamente','');
          },
          err => {
            console.error(err);
            this.notifiacionService.getToastError('Fallo al asignar empleado', '');
          }
        );
    }
  }

  onChangeTipo(idTipo) {
    console.log(idTipo);
  }

  onChangeEstado(idEstado) {
    // console.log(idEstado);
    if (this.seleccionado) {
      this.pedidoService.actualizarEstadoPedido(this.idPedido_AUX, idEstado, this.idUsuario)
        .subscribe(
          res => {
            this.obtenerListaPedidos();
            this.notifiacionService.getToastSuccess('Estado actualizado correctamente','');
          },
          err => {
            console.error(err)
            this.notifiacionService.getToastError('Fallo al actualizar estado', '');
          }
        );
    }
  }

}
