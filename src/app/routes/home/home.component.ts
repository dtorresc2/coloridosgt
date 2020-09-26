import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ID: any;
  idUsuario: any;

  arregloUsuario:any = [];
  usuario:any;
  correo:any;
  permisos1:any;
  permisos2:any;
  permisos3:any;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }

    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.usersService.obtenerUsuarios()
      .subscribe(
        res => {
          // localStorage.setItem('userName', (<any>res).nick);
          console.log(res);
          this.arregloUsuario = res;
          let encontrado = this.arregloUsuario.find(element => element.idusuario = this.idUsuario);
          // console.log(encontrado.correo);
          this.usuario = encontrado.nombrerol;
          this.correo = encontrado.correo;
        },
        err => console.error(err)
      );
  }

}
