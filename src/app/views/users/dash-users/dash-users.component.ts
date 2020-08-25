import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/controllers/usuario';
import { RespuestaUsuario } from 'src/app/controllers/respuestaUsuario';
import { RespuestaUpdate } from 'src/app/controllers/respuestaUpdate';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
declare var $: any; // jQuery

@Component({
  selector: 'app-dash-users',
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.css']
})
export class DashUsersComponent implements OnInit {
  idUsuario: any;
  user: FormGroup;
  listaClientes: any = [];

  comprobador: boolean = false;

  isEdit: boolean = false;
  isDelete: boolean = false;
  isNew: boolean = true;

  idUsuarioAUX: any;

  // Inicializacion de interfaces
  usuario: Usuario = {
    email: '',
    user: '',
    password: '',
    usuario: 0
  }

  respuesta: RespuestaUsuario = {
    EstadoInsert: '',
    Id: 0
  }

  update: RespuestaUpdate = {
    EstadoUpdate: ''
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
      // this.ID = 'Registrado';
      this.obtenerListaClientes();
    }
    else {
      // this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }

    this.usersService.getIPAddress()
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      )

  }

  // Funcion de confirmacion de usuarios
  passwordMatchValidator(g: FormGroup): { invalid: boolean } {
    return g.get('password').value === g.get('confirmpass').value ? null : { invalid: true };
  }

  onSubmit() {
    this.comprobador = true;

    if (this.isNew) {
      // console.log("Voy a crear")
      this.guardarCliente();
    }

    if (this.isEdit) {
      // console.log("Voy a editar")
      this.editarCliente();
    }

    if (this.isDelete) {
      // console.log("Voy a eliminar");
      this.eliminarCliente();
    }

  }

  creado() {
    this.user.reset();
    this.isEdit = false;
    this.isDelete = false;
    this.isNew = true;
  }

  editado(id, usuarioParametro) {
    this.user.reset();
    this.isEdit = true;
    this.isDelete = false;
    this.isNew = false;

    this.idUsuarioAUX = id;

    this.user.get('username').setValue(usuarioParametro.nombrerol);
    this.user.get('email').setValue(usuarioParametro.correo);
    this.user.get('password').setValue('2');
    this.user.get('confirmpass').setValue('2');
  }

  eliminado(id, usuarioParametro) {
    this.user.reset();
    this.isEdit = false;
    this.isDelete = true;
    this.isNew = false;

    this.idUsuarioAUX = id;

    this.user.get('username').setValue(usuarioParametro.nombrerol);
    this.user.get('email').setValue(usuarioParametro.correo);
    this.user.get('password').setValue('2');
    this.user.get('confirmpass').setValue('2');
  }


  // Catalogo de clientes
  obtenerListaClientes() {
    this.usersService.obtenerUsuarios()
      .subscribe(
        res => {
          this.listaClientes = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  // Registrar Cliente
  guardarCliente() {
    this.usuario.user = this.user.get('username').value;
    this.usuario.email = this.user.get('email').value;
    this.usuario.password = this.user.get('password').value;
    this.usuario.usuario = this.idUsuario;

    this.usersService.registrarUsuario(this.usuario)
      .subscribe(
        res => {
          console.log(res);

          this.respuesta = res;

          setTimeout(() => {
            this.comprobador = false;
          }, 1500);

          setTimeout(() => {
            if (this.respuesta.Id > 0) {
              this.user.reset();
              this.obtenerListaClientes();
              // localStorage.setItem('idUsuario', this.respuesta.Id.toString());
              // this.clientService.autenticado = true;
              // this.router.navigate(['/dashboard']);
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

  editarCliente() {
    this.usuario.nombrerol = this.user.get('username').value;
    this.usuario.correo = this.user.get('email').value;
    this.usuario.usuario = this.idUsuario;

    // this.usuario.password = this.user.get('password').value;

    this.usersService.actualizarUsuario(this.idUsuarioAUX, this.usuario)
      .subscribe(
        res => {

          this.update = res;

          setTimeout(() => {
            this.comprobador = false;
          }, 1500);

          setTimeout(() => {
            if (this.update.EstadoUpdate == 'Correcto') {
              this.user.reset();
              this.obtenerListaClientes();
              this.creado();
            }
            else {
              this.update.EstadoUpdate = '';
              // this.respuesta.EstadoInsert = '';
              $('.alert').alert('close');
              // this.user.get('email').setValue(null);
              // this.user.get('password').setValue(null);
              // this.user.get('confirmpass').setValue(null);
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

  eliminarCliente() {
    this.usuario.usuario = this.idUsuario;

    this.usersService.eliminarUsuario(this.idUsuarioAUX, this.idUsuario)
      .subscribe(
        res => {
          this.update = res;

          setTimeout(() => {
            this.comprobador = false;
          }, 1500);

          setTimeout(() => {
            if (this.update.EstadoUpdate == 'Correcto') {
              this.user.reset();
              this.obtenerListaClientes();
              this.creado();
            }
            else {
              this.update.EstadoUpdate = '';
              $('.alert').alert('close');
              this.user.reset();
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

  bitacora(id) {
    this.router.navigate(['users', id, 'bitacora']);
  }

}
