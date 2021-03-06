import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/controllers/cliente';
import { RespuestaLogin } from 'src/app/controllers/respuestaLogin';
declare var $: any; // jQuery

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})

export class SinginComponent implements OnInit {
  user: FormGroup;
  idUsuario: any;
  comprobador: boolean = false;

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
    // localStorage.clear();
    // this.clientService.autenticado = false;

    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      }
    );

    if (localStorage['idUsuario']) {
      this.router.navigate(['/dashboard']);
      this.clientService.autenticado = true;
    }
    else {
      this.clientService.autenticado = false;
    }

  }

  onSubmit() {
    this.comprobador = true;
    this.autenticarCliente();
  }

  autenticarCliente() {
    this.cliente.nick = this.user.get('email').value;
    this.cliente.password = this.user.get('password').value;

    this.clientService.autenticarCliente(this.cliente).subscribe(
      res => {
        console.log(res);

        this.respuesta = res;

        setTimeout(() => {
          this.comprobador = false;
        }, 1500);

        setTimeout(() => {
          if (this.respuesta.USUARIO > 0) {
            localStorage.setItem('idUsuario', this.respuesta.USUARIO.toString());
            this.clientService.autenticado = true;
            this.router.navigate(['/dashboard']);
          }
          else {
            this.respuesta.USUARIO = 0;
            this.respuesta.ESTADO = '';
            this.user.get('password').setValue(null);
            $('.alert').alert('close');
          }
        }, 1000);
      },
      err => console.log(err)
    );
  }

}
