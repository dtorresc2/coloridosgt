import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/controllers/cliente';
import { RespuestaLogin } from 'src/app/controllers/respuestaLogin';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})

export class SinginComponent implements OnInit {
  user: FormGroup;

  cliente: Cliente = {
    name: '',
    lastname: '',
    nit: '0',
    nick: '',
    password: ''
  }

  respuesta: RespuestaLogin = {
    ESTADO: '',
    USUARIO: 0
  }


  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.clientService.autenticado = false;

    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      }
    );

  }

  onSubmit() {
    this.autenticarCliente();
  }

  autenticarCliente() {
    this.cliente.nick = this.user.get('email').value;
    this.cliente.password = this.user.get('password').value;

    this.clientService.autenticarCliente(this.cliente).subscribe(
      res => {
        console.log(res);

        this.respuesta = res;

        if (this.respuesta.USUARIO > 0) {
          localStorage.setItem('idUsuario', this.respuesta.USUARIO.toString());
          this.clientService.autenticado = true;
          this.router.navigate(['/dashboard']);
        }
      },
      err => console.log(err)
    );
  }

}
