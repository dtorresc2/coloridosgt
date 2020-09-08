import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Cliente } from '../../controllers/cliente';
import { RespuestaUsuario } from '../../controllers/respuestaUsuario';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { Router } from '@angular/router';
declare var $: any; // jQuery

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  user: FormGroup
  comprobador: boolean = false;

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

  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit(): void {
    // localStorage.clear();
    // this.clientService.autenticado = false;


    // "name": "Usuario", 
    // "lastname": "Prueba", 
    // "nick": "prueba123@correo.com", 
    // "password": "123",
    // "telefono": "2545-5454",
    // "nit": "1351132",
    // "dpi": "121212121"

    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmpass: new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.required),
        nit: new FormControl('', Validators.required),
        dpi: new FormControl('', Validators.required)
      },
      {
        validators: this.passwordMatchValidator
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
    this.cliente.telefono = this.user.get('telefono').value;
    this.cliente.nit = this.user.get('nit').value;
    this.cliente.dpi = this.user.get('dpi').value;
    // this.user.reset();
    // this.router.navigate(['/home']);
    // localStorage.setItem('','');

    this.clientService.registrarCliente(this.cliente)
      .subscribe(
        res => {
          console.log(res);

          this.respuesta = res;

          setTimeout(() => {
            this.comprobador = false;
          }, 1500);

          setTimeout(() => {
            if (this.respuesta.Id > 0) {
              localStorage.setItem('idUsuario', this.respuesta.Id.toString());
              this.clientService.autenticado = true;
              this.router.navigate(['/dashboard']);
            }
            else {
              this.respuesta.Id = 0;
              this.respuesta.EstadoInsert = '';
              $('.alert').alert('close');
              this.user.get('email').setValue(null);
              this.user.get('password').setValue(null);
              this.user.get('confirmpass').setValue(null);
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }


}
