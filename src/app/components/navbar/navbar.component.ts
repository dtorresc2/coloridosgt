import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';

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

  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.comprobarSesion();
    },1);
  }

  comprobarSesion() {
    this.idUsuario = localStorage.getItem('idUsuario');
    this.sesion = this.clientService.autenticado;
  }

  cerrarSesion() {
    this.sesion = false;
    this.clientService.autenticado = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
