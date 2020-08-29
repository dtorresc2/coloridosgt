import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/productos/categorias.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';


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

  constructor(
    private modalService: NgbModal, 
    private usersService: UsersService,
    private pedidoService: PedidosService, 
    private router: Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }

    this.obtenerListaEmpleados();
    this.obtenerListaEstados();
    this.obtenerListaTipos();
  }

  openScrollableContent(longContent, id) {
    this.modalService.open(longContent, { scrollable: true, size: 'lg', centered: true });
    console.log(id);
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

  obtenerListaEstados(){
    this.pedidoService.obtenerEstadosCategoria()
      .subscribe(
        res => {
          this.listaEstados = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  obtenerListaTipos(){
    this.pedidoService.obtenerTiposCategoria()
      .subscribe(
        res => {
          this.listaTipos = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

}
