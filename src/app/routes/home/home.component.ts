import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { FinanzaService } from 'src/app/services/finanzas/finanza.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ID: any;
  idUsuario: any;

  arregloUsuario: any = [];
  arregloPedidos: any = [];
  arregloIngresos: any = [];

  usuario: any;
  correo: any;
  intervalo;

  contadorPedidos: any = 0;

  moduloUsuarios: boolean = false;
  moduloPedidos: boolean = false;
  moduloProductos: boolean = false;
  moduloFinanzas: boolean = false;

  ultimaActividad: any;

  fromDate: any;
  totalIngresos: any = 0;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private pedidoService: PedidosService,
    private finanzaService: FinanzaService,
    private calendar: NgbCalendar
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

    this.fromDate = this.calendar.getToday();

    this.obtenerUsuario();
    this.obtenerBitacora();
    this.obtenerDetallesPedido();
    // this.obtenerGananciasHoy();

    this.intervalo = setInterval(() => {
      if (localStorage['idUsuario']) {
        this.usersService.obtenerPermisos(localStorage.getItem('idUsuario'))
          .subscribe(
            res => {
              this.moduloUsuarios = (<any>res[0]).bitacora_y_usuario == 1 ? true : false;
              this.moduloPedidos = (<any>res[0]).ventas == 1 ? true : false;
              this.moduloProductos = (<any>res[0]).inventario == 1 ? true : false;
              this.moduloFinanzas = (<any>res[0]).finanzas == 1 ? true : false;
            },
            err => console.error(err)
          );
      }
    }, 1000);
  }

  obtenerUsuario() {
    this.usersService.obtenerUsuarios()
      .subscribe(
        res => {
          this.arregloUsuario = res;
          let encontrado = this.arregloUsuario.find(element => element.idusuario = this.idUsuario);
          this.usuario = encontrado.nombrerol;
          this.correo = encontrado.correo;
        },
        err => console.error(err)
      );
  }

  obtenerBitacora() {
    this.usersService.obtenerBitacora(localStorage.getItem('idUsuario'))
      .subscribe(
        res => {
          this.ultimaActividad = (<any>res[0]).fecha + ' ' + (<any>res[0]).hora;
        },
        err => console.error(err)
      );
  }

  obtenerGanancias(): Promise<boolean> {
    return new Promise(
      resolve => {
        this.pedidoService.obtenerPedidos()
          .subscribe(
            res => {
              this.arregloPedidos = res;
              resolve(true);
            },
            err => {
              console.error(err);
              resolve(false);
            }
          );
      });
  }

  async obtenerDetallesPedido() {
    await this.obtenerGanancias();
    await this.obtenerGananciasHoy();

    this.arregloPedidos.forEach(element => {
      if (element.idusuario == this.idUsuario) {
        this.contadorPedidos++;
      }
    });

    this.arregloIngresos.forEach(element => {
      this.totalIngresos += element.total;
    });

  }

  obtenerGananciasHoy(): Promise<boolean> {
    let fechaFinal = this.fromDate.year + '/' + this.fromDate.month + '/' + this.fromDate.day;
    return new Promise(
      resolve => {
        this.finanzaService.obtenerIngresos(fechaFinal, fechaFinal)
          .subscribe(
            res => {
              this.arregloIngresos = res;
              resolve(true);
            },
            err => {
              console.error(err);
              resolve(false);
            }
          );
      });
  }

}
