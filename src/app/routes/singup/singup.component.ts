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
    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$')]),
        lastname: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$')]),
        password: new FormControl('', Validators.required),
        confirmpass: new FormControl('', Validators.required),
        telefono: new FormControl('', [Validators.required, Validators.pattern('^[2-8]{1}[0-9]{3}[-][0-9]{4}$')]),
        nit: new FormControl('', Validators.required),
        dpi: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{13}$')])
      },
      {
        validators: [this.passwordMatchValidator, this.nitMatchValidator]
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

  nitMatchValidator(g: FormGroup): { nitInvalido: boolean } {
    let txtN = g.get('nit').value;
    // console.log(txtN);

    // http://mariobatres7.blogspot.com/2008/02/validar-el-nit-con-modulo-11.html
    if (txtN != '') {
      txtN = txtN.toUpperCase();

      if (txtN == "CF" || txtN == "C/F") return null;

      var nit = txtN;
      var pos = nit.indexOf("-");

      if (pos < 0) {
        var correlativo = txtN.substr(0, txtN.length - 1);
        correlativo = correlativo + "-";

        var pos2 = correlativo.length - 2;
        var digito = txtN.substr(pos2 + 1);
        nit = correlativo + digito;
        pos = nit.indexOf("-");
        txtN = nit;
      }

      var Correlativo = nit.substr(0, pos);
      var DigitoVerificador = nit.substr(pos + 1);
      var Factor = Correlativo.length + 1;
      var Suma = 0;
      var Valor = 0;

      for (let x = 0; x <= (pos - 1); x++) {
        Valor = eval(nit.substr(x, 1));
        // var Multiplicacion = eval(Valor * Factor);
        var Multiplicacion = Valor * Factor;
        // Suma = eval(Suma + Multiplicacion);
        Suma = Suma + Multiplicacion;
        Factor = Factor - 1;
      }

      var xMOd11 = 0;
      xMOd11 = (11 - (Suma % 11)) % 11;
      var s = xMOd11;

      if ((xMOd11 == 10 && DigitoVerificador == "K") || (s == DigitoVerificador)) {
        return null;
      }
      else {
        return { nitInvalido: true };
      }
    }
    // return { nitInvalido: true }
    // return g.get('password').value === g.get('confirmpass').value ? null : { nitInvalido: true };
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
