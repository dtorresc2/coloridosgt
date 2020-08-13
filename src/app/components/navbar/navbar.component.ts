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

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.comprobarSesion();
      console.log(this.sesion);

    },1000)

  }

  comprobarSesion() {
    this.idUsuario = localStorage.getItem('idUsuario');
    this.sesion = this.usersService.autenticado;
  }

  cerrarSesion() {
    this.sesion = false;
    this.usersService.autenticado = false;
    localStorage.clear();
    this.router.navigate(['/singin']);
  }

}
