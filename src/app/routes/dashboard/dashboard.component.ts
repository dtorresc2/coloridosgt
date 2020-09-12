import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ID: any;
  idUsuario: any;

  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit(): void {

    if (localStorage["idUsuario"]) {
      this.idUsuario = localStorage.getItem('idUsuario');
      this.obtenerUsuario();
      // this.clientService.autenticado = true;
    }

  }

  obtenerUsuario() {
    this.clientService.obtenerCliente(this.idUsuario)
      .subscribe(
        res => {
          localStorage.setItem('userName', (<any>res).nick);
          // console.log(res);
        },
        err => console.error(err)
      );
  }

}
