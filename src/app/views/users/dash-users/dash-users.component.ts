import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/controllers/usuario';
import { RespuestaUsuario } from 'src/app/controllers/respuestaUsuario';
import { RespuestaUpdate } from 'src/app/controllers/respuestaUpdate';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService } from 'src/app/services/toasts/toasts.service';

declare var $: any; // jQuery

@Component({
  selector: 'app-dash-users',
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.css']
})
export class DashUsersComponent implements OnInit {
  idUsuario: any;
  user: FormGroup;
  passUpdate: FormGroup;
  listaClientes: any = [];

  comprobador: boolean = false;
  comprobador2: boolean = false;

  isEdit: boolean = false;
  isDelete: boolean = false;
  isNew: boolean = true;

  moduloProductos: boolean = false;
  moduloPedidos: boolean = true;
  moduloUsuarios: boolean = false;

  idUsuarioAUX: any;
  filtro = '';
  idObjetoAux: any;

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

  constructor(
    private usersService: UsersService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private notificacionService: NotificacionService
  ) { }

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

    this.passUpdate = new FormGroup(
      {
        password: new FormControl('', Validators.required),
        confirmpass: new FormControl('', Validators.required),
      }
      ,
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

    // this.showSuccess();

    // this.usersService.getIPAddress()
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     err => console.error(err)
    //   )

  }

  // Funcion de confirmacion de usuarios
  passwordMatchValidator(g: FormGroup): { invalid: boolean } {
    return g.get('password').value === g.get('confirmpass').value ? null : { invalid: true };
  }

  showSuccess() {
    this.toastr.success('Hello world!', '', {
      closeButton: true,
      toastClass: 'ngx-toastr bg-primary',
      titleClass: 'toast-title text-white',
      timeOut: 1000
    });
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

              if (this.usuario.usuario == this.idUsuarioAUX){
                localStorage.setItem('userName', this.usuario.nombrerol);
              }

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
    this.router.navigate(['users', id, 'log']);
  }

  keyPress(event: KeyboardEvent) {
    // const pattern = /[0-9]/;
    // const inputChar = String.fromCharCode(event).charCode);
    // if (!pattern.test(inputChar)) {    
    //     // invalid character, prevent input
    //     event.preventDefault();
    // }
    // console.log(event);
  }

  abrirModalPermisos(content, id, inventario, ventas, bitacora_y_usuario) {
    // this.urlAUX = url;

    // let moduloProductosAux = this.moduloProductos == true ? 1 : 0;
    this.moduloProductos = inventario == 1 ? true : false;
    this.moduloPedidos = ventas == 1 ? true : false;
    this.moduloUsuarios = bitacora_y_usuario == 1 ? true : false;
    // let moduloPedidosAux = this.moduloPedidos == true ? 1 : 0;
    // let moduloUsuariosAux = this.moduloUsuarios == true ? 1 : 0;

    this.idObjetoAux = id;
    this.modalService.open(content, { centered: true });
    // console.log(id);
  }

  abrirModalPass(content, id) {
    // this.urlAUX = url;
    this.idObjetoAux = id;
    this.modalService.open(content, { centered: true });
    // console.log(id);
  }

  ejecutarActualizacionPass() {
    // this.usuario.usuario = this.idUsuario;
    this.comprobador2 = true;
    this.usersService.actualizarPass(this.idObjetoAux, this.idUsuario, this.passUpdate.get('password').value)
      .subscribe(
        res => {

          setTimeout(() => {
            this.comprobador2 = false;
          }, 1500);

          setTimeout(() => {
            if ((<any>res).EstadoUpdate == 'Correcto') {
              this.passUpdate.reset();
              $('#modalPass').modal('hide')
              this.obtenerListaClientes();

              this.toastr.success('Actualizacion Realizada!', '', {
                closeButton: true,
                toastClass: 'ngx-toastr bg-primary',
                titleClass: 'toast-title text-white',
                timeOut: 1000
              });

              // this.creado();
            }
            else {
              this.update.EstadoUpdate = '';
              // $('.alert').alert('close');
              this.passUpdate.reset();

              this.toastr.error('Fallo en actualizacion de credenciales', '', {
                closeButton: true,
                toastClass: 'ngx-toastr bg-danger',
                titleClass: 'toast-title text-white',
                timeOut: 1000
              });

            }
            this.passUpdate.reset();
          }, 1000);
        },
        err => console.error(err)
      );
  }

  actualizarPermisos() {
    let moduloProductosAux = this.moduloProductos == true ? 1 : 0;
    let moduloPedidosAux = this.moduloPedidos == true ? 1 : 0;
    let moduloUsuariosAux = this.moduloUsuarios == true ? 1 : 0;

    this.comprobador2 = true;

    this.usersService.actualizarPermisos(
      this.idObjetoAux, this.idUsuario,
      moduloProductosAux, moduloPedidosAux,
      moduloUsuariosAux
    ).subscribe(
      res => {

        setTimeout(() => {
          this.comprobador2 = false;
        }, 1500);

        setTimeout(() => {
          if ((<any>res).EstadoUpdate == 'Correcto') {
            this.passUpdate.reset();
            $('#modalPass').modal('hide')
            this.obtenerListaClientes();

            // this.toastr.success('Actualizacion Realizada!', '', {
            //   closeButton: true,
            //   toastClass: 'ngx-toastr bg-primary',
            //   titleClass: 'toast-title text-white',
            //   timeOut: 1000
            // });

            this.notificacionService.getToastSuccess('Actualizacion realizada');

            // this.creado();
          }
          else {
            this.update.EstadoUpdate = '';
            // $('.alert').alert('close');
            // this.passUpdate.reset();

            this.notificacionService.getToastError('Fallo en actualizacion de permisos');


            // this.toastr.error('Fallo en actualizacion de permisos', '', {
            //   closeButton: true,
            //   toastClass: 'ngx-toastr bg-danger',
            //   titleClass: 'toast-title text-white',
            //   timeOut: 1000
            // });

          }
          this.passUpdate.reset();
        }, 1000);
      },
      err => console.error(err)
    );
  }

  checkCheckBoxvalue(event) {
    this.moduloPedidos = event.checked;
  }

}

// TEXTO = TEXTO.indexOf("-") >= 0 ? TEXTO.substring(TEXTO.indexOf("-") + 1).trim() : TEXTO;
