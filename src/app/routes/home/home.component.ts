import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ID: any;
  idUsuario: any;

  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit(): void {

    if (localStorage['idUsuario']) {
      this.router.navigate(['/dashboard']);
      this.idUsuario = localStorage.getItem('idUsuario');
      this.clientService.autenticado = true;
    }
    else {
      console.log("No existe");
      this.clientService.autenticado = false;
    }

  }

}
