import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/controllers/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  idUsuario: any;
  user: FormGroup;
  comprobador: boolean = false;
  isEdit: boolean = false;
  isDelete: boolean = false;

  usuario: Usuario = {
    email: '',
    user: '',
    password: ''
  }

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {

    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmpass: new FormControl('', Validators.required)
      },
      {
        validators: this.passwordMatchValidator
      }
    );

    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.router.navigate(['/home']);
    }
    else {
      localStorage.clear();
      this.usersService.autenticado = false;

    }
  }

  // Funcion de confirmacion de usuarios
  passwordMatchValidator(g: FormGroup): { invalid: boolean } {
    return g.get('password').value === g.get('confirmpass').value ? null : { invalid: true };
  }

  onSubmit() {
    this.comprobador = true;

    if (this.isEdit) {

    }

  }

  // Registrar Cliente
  guardarCliente() {
    this.usuario.user = this.user.get('username').value;
    this.usuario.email = this.user.get('email').value;
    this.usuario.password = this.user.get('password').value;

  //   this.usersService.registrarCliente(this.cliente)
  //     .subscribe(
  //       res => {
  //         console.log(res);

  //         this.respuesta = res;

  //         setTimeout(() => {
  //           this.comprobador = false;
  //         }, 1500);

  //         setTimeout(() => {
  //           if (this.respuesta.Id > 0) {
  //             localStorage.setItem('idUsuario', this.respuesta.Id.toString());
  //             this.clientService.autenticado = true;
  //             this.router.navigate(['/dashboard']);
  //           }
  //           else {
  //             this.respuesta.Id = 0;
  //             this.respuesta.EstadoInsert = '';
  //             $('.alert').alert('close');
  //             this.user.get('email').setValue(null);
  //             this.user.get('password').setValue(null);
  //             this.user.get('confirmpass').setValue(null);
  //           }
  //         }, 1000);
  //       },
  //       err => console.error(err)
  //     );
  }

}
