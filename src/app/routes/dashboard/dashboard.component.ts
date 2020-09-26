import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ID: any;
  idUsuario: any;
  listaPedidos: any = [];
  total: any = 0;

  nombreCompleto: any;
  usuario: any;
  correo: any;
  dpi: any;

  ultimoActividad: any;

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private pedidoService: PedidosService
  ) { }

  ngOnInit(): void {

    if (localStorage["idUsuario"]) {
      this.idUsuario = localStorage.getItem('idUsuario');
      this.obtenerUsuario();
      this.obtenerTotal();
      this.obtenerBitacora();
      // this.clientService.autenticado = true;
    }

  }

  async obtenerTotal() {
    await this.obtenerPedidos();
    this.listaPedidos.forEach(element => {
      this.total += element.total;
    });

    this.total = parseFloat(this.total).toFixed(2);

  }

  obtenerUsuario() {
    this.clientService.obtenerCliente(this.idUsuario)
      .subscribe(
        res => {
          localStorage.setItem('userName', (<any>res).nick);
          // console.log(res);
          this.nombreCompleto = (<any>res).nombre + ' ' + (<any>res).apellido;
          this.usuario = (<any>res).nick;
          this.dpi = (<any>res).dpi;
          this.correo = (<any>res).correo;
        },
        err => console.error(err)
      );
  }

  obtenerBitacora() {
    this.clientService.obtenerBitacora(this.idUsuario)
      .subscribe(
        res => {
          // localStorage.setItem('userName', (<any>res).nick);
          // console.log((<any>res[0]).id);
          // console.log((<any>res[0]).fecha, '-', (<any>res[0]).hora);
          this.ultimoActividad = (<any>res[0]).fecha + ' ' + (<any>res[0]).hora;
          // this.nombreCompleto = (<any>res).nombre + ' ' + (<any>res).apellido;
          // this.usuario = (<any>res).nick;
          // this.dpi = (<any>res).dpi;
        },
        err => console.error(err)
      );
  }

  obtenerPedidos(): Promise<boolean> {
    return new Promise(
      resolve => {
        this.pedidoService.obtenerPedidosCliente(this.idUsuario)
          .subscribe(
            res => {
              this.listaPedidos = res;
              resolve(true);
            },
            err => {
              console.error(err)
              resolve(false);
            }
          );
      });
  }

}
