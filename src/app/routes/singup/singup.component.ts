import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Cliente } from '../../controllers/cliente';
import { RespuestaUsuario } from '../../controllers/respuestaUsuario';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  user: FormGroup

  cliente: Cliente = {
    name: '',
    lastname: '',
    nit: '0',
    nick: '',
    password: ''
  }

  respuesta: RespuestaUsuario = {
    EstadoInsert: '',
    Id: 0
  }

  constructor(private clientService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
    this.clientService.autenticado = false;

    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmpass: new FormControl('', Validators.required)
      },
      {
        validators: this.passwordMatchValidator
      }
    );

  }

  onSubmit() {
    this.guardarCliente();
  }

  // Funcion de confirmacion de usuarios
  passwordMatchValidator(g: FormGroup): { invalid: boolean } {
    return g.get('password').value === g.get('confirmpass').value ? null : { invalid: true };
  }

  // Registrar Cliente
  guardarCliente() {
    this.cliente.name = this.user.get('name').value;
    this.cliente.lastname = this.user.get('lastname').value;
    this.cliente.nick = this.user.get('email').value;
    this.cliente.password = this.user.get('password').value;
    // this.user.reset();
    // this.router.navigate(['/home']);
    // localStorage.setItem('','');

    this.clientService.registrarCliente(this.cliente)
      .subscribe(
        res => {
          // console.log(res);
          this.respuesta = res;

          // console.log(this.respuesta);

          if (this.respuesta.Id > 0) {
            localStorage.setItem('idUsuario', this.respuesta.Id.toString());
            this.clientService.autenticado = true;
            this.router.navigate(['/dashboard']);
          }

        },
        err => console.error(err)
      );
  }


}
