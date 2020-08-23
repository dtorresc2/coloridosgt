import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bitacora-users',
  templateUrl: './bitacora-users.component.html',
  styleUrls: ['./bitacora-users.component.css']
})
export class BitacoraUsersComponent implements OnInit {
  idUsuario: any;
  ID: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }
  }

}
