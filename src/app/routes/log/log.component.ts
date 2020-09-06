import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  idUsuario: any;
  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
    }
  }

}
