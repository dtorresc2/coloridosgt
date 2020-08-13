import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/controllers/usuario';

import { RespuestaLogin } from 'src/app/controllers/respuestaLogin';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  user: FormGroup;

  usuario: Usuario = {
    email: '',
    user: 'user',
    password: ''
  }

  respuesta: RespuestaLogin = {
    ESTADO: '',
    USUARIO: 0
  }

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    // localStorage.clear();
    // this.usersService.autenticado = false; ACA ME QUEDE
    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      }
    );
  }

  onSubmit() {
    this.autenticarUsuario();
  }

  autenticarUsuario() {
    this.usuario.email = this.user.get('email').value;
    this.usuario.password = this.user.get('password').value;
    let auxUser = this.usuario.email.split('@');
    this.usuario.user = auxUser.toString();

    this.usersService.autenticarCliente(this.usuario).subscribe(
      res => {
        console.log(res);
        this.respuesta = res;

        if (this.respuesta.USUARIO > 0) {
          localStorage.setItem('idUsuario', this.respuesta.USUARIO.toString());
          this.usersService.autenticado = true;
          this.router.navigate(['/home']);
        }
      },
      err => console.log(err)
    );
  }

}
