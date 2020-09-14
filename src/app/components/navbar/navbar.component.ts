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
  userName: any = "username"

  moduloUsuarios: boolean = false;
  moduloPedidos: boolean = false;
  moduloProductos: boolean = false;
  moduloFinanzas: boolean = false;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.comprobarSesion();
    },1);
  }

  comprobarSesion() {
    this.idUsuario = localStorage.getItem('idUsuario');
    this.sesion = this.usersService.autenticado;
    this.moduloUsuarios = this.usersService.moduloUsuarios;
    this.moduloPedidos = this.usersService.moduloPedidos;
    this.moduloProductos = this.usersService.moduloProductos;
    this.moduloFinanzas = this.usersService.moduloFinanzas;
    this.sesion = this.usersService.autenticado;
    this.userName = localStorage.getItem('userName');
  }

  cerrarSesion() {
    this.sesion = false;
    this.usersService.autenticado = false;
    localStorage.clear();
    this.router.navigate(['/singin']);
  }

}
