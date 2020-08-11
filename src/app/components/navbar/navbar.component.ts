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

  constructor(private clientService: ClientsService, private router:Router) { }

  ngOnInit(): void {
    this.sesion = this.clientService.autenticado;
  }

  comprobarSesion() {
    this.sesion = this.clientService.autenticado;
  }

  cerrarSesion() {
    this.sesion = false;
    this.clientService.autenticado = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
