import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clientes/clients.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      // this.idUsuario = localStorage.getItem('idUsuario');
      this.clientService.autenticado = true;
      // this.router.navigate['/log'];
    }
    else {
      this.clientService.autenticado = false;
    }
  }

}
