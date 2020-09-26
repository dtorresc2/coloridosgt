import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ID: any;
  idUsuario: any;

  arregloUsuario:any = [];
  usuario:any;
  correo:any;
  intervalo;

  moduloUsuarios: boolean = false;
  moduloPedidos: boolean = false;
  moduloProductos: boolean = false;
  moduloFinanzas: boolean = false;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }

    this.obtenerUsuario();

    this.intervalo = setInterval(() => {
      if (localStorage['idUsuario']) {
        this.usersService.obtenerPermisos(localStorage.getItem('idUsuario'))
          .subscribe(
            res => {
              // console.log((<any>res[0]).bitacora_y_usuario);
              this.moduloUsuarios = (<any>res[0]).bitacora_y_usuario == 1 ? true : false;
              this.moduloPedidos = (<any>res[0]).ventas == 1 ? true : false;
              this.moduloProductos = (<any>res[0]).inventario == 1 ? true : false;
              this.moduloFinanzas = (<any>res[0]).finanzas == 1 ? true : false;

              // this.usersService.moduloUsuarios = this.moduloUsuarios;
              // this.usersService.moduloPedidos = this.moduloPedidos;
              // this.usersService.moduloProductos = this.moduloProductos;
              // this.usersService.moduloFinanzas = this.moduloFinanzas;
              // this.moduloUsuarios = (<any>res).
              // console.log(res);
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
          // localStorage.setItem('userName', (<any>res).nick);
          // console.log(res);
          this.arregloUsuario = res;
          let encontrado = this.arregloUsuario.find(element => element.idusuario = this.idUsuario);
          // console.log(encontrado.correo);
          this.usuario = encontrado.nombrerol;
          this.correo = encontrado.correo;
        },
        err => console.error(err)
      );
  }

}
