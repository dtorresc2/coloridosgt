import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

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
  items: any = 0;

  constructor(private clientService: ClientsService, private router: Router, private pedidoService: PedidosService) { }

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.comprobarSesion();
      this.items = this.pedidoService.cantidadItems;
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
