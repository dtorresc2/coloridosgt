import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/usuarios/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ID: any;
  idUsuario: any;
  sesion: boolean = false;
  intervalo;

  intervalo2;
  userName: any = "username"

  moduloUsuarios: boolean = false;
  moduloPedidos: boolean = false;
  moduloProductos: boolean = false;
  moduloFinanzas: boolean = false;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.comprobarSesion();
    }, 1);

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

              this.usersService.moduloUsuarios = this.moduloUsuarios;
              this.usersService.moduloPedidos = this.moduloPedidos;
              this.usersService.moduloProductos = this.moduloProductos;
              this.usersService.moduloFinanzas = this.moduloFinanzas;
              // this.moduloUsuarios = (<any>res).
              // console.log(res);
            },
            err => console.error(err)
          );
      }
    }, 1000);
  }

  comprobarSesion() {
    this.idUsuario = localStorage.getItem('idUsuario');
    this.sesion = this.usersService.autenticado;
    // this.moduloUsuarios = this.usersService.moduloUsuarios;
    // this.moduloPedidos = this.usersService.moduloPedidos;
    // this.moduloProductos = this.usersService.moduloProductos;
    // this.moduloFinanzas = this.usersService.moduloFinanzas;
    this.sesion = this.usersService.autenticado;
    this.userName = localStorage.getItem('userName');
  }

  obtenerPermisos() {

  }

  cerrarSesion() {
    this.sesion = false;
    this.usersService.autenticado = false;
    localStorage.clear();
    this.router.navigate(['/singin']);
  }

}
