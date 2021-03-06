import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  idUsuario: any;
  show: boolean = true;
  listaBitacora:any = [];

  page = 1;
  pageSize = 10;

  constructor(private clientService: ClientsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
      this.clientService.autenticado = true;
      // this.router.navigate['/log'];
    }
    else {
      this.clientService.autenticado = false;
    }

    setTimeout(() => {
      this.listaBitacora = this.activatedRoute.snapshot.data.log;
      this.show = false;
    }, 1000);

  }

}
