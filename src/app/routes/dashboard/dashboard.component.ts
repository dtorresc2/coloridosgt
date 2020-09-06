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
      this.clientService.autenticado = true;
    }
    else {
      console.log("No Existe");
      this.clientService.autenticado = false;
    }

  }

}
