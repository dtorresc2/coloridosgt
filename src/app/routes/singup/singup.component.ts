import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Cliente } from '../../controllers/cliente';
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
    pass: ''
  }

  constructor(private clientService:ClientsService, private router:Router) {

  }

  ngOnInit(): void {
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
  guardarCliente(){
    // delete this.cliente.created_at;
    // delete this.game.id;

    this.cliente.name = this.user.get('name').value;
    this.cliente.lastname = this.user.get('lastname').value;
    this.cliente.nick = this.user.get('email').value;
    this.cliente.pass = this.user.get('password').value;

    this.clientService.registrarCliente(this.cliente)
      .subscribe(
        res => { 
          console.log(res);
          // this.user.reset();
          // this.router.navigate(['/home']);
        },
        err => console.error(err)
      );
  }


}
