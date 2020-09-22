import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';
import 'moment-timezone';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoInventario, DetallePedido } from 'src/app/controllers/pedido';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Cliente, ClienteActualizacion } from 'src/app/controllers/cliente';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent implements OnInit {
  client: FormGroup;
  fecha: any;
  contador: number = 0;
  cambiado: boolean = false;

  listaEnvios: any = [];
  arregloComprobacion: Array<ResultadoInventario> = [];

  nickAuxiliar: any;
  servicioModalAux: any;

  comprobacion: ResultadoInventario = {
    idProducto: 0,
    cantidadDisp: 0,
    cantidadPedida: 0,
    estado: 0,
    producto: ''
  };

  datosNuevos: ClienteActualizacion = {
    nombre: '',
    apellido: '',
    nit: '',
    telefono: '',
    dpi: '',
    correo: '',
    nick: ''
  }

  idEnvioAux: any = 0;
  totalAux: any = 0;
  descuentoAux: any = 0;

  // Variables de Inputs
  isNombre: boolean = false;
  isApellido: boolean = false;
  isNit: boolean = false;
  isDpi: boolean = false;
  isTel: boolean = false;
  isDireccion: boolean = false;

  constructor(
    private pedidoService: PedidosService,
    private router: Router,
    private clienteService: ClientsService,
    private modalService: NgbModal,
    private productoService: ProductosService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    if (localStorage['idUsuario'] && this.pedidoService.cantidadItems > 0) {

      this.clienteService.obtenerCliente(localStorage.getItem('idUsuario'))
        .subscribe(
          res => {
            // console.log(res);
            this.cargarCliente(res);
          },
          err => console.error(err)
        );

    }
    else {
      this.router.navigate(['/dashboard']);
    }

    this.client = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$'), Validators.maxLength(40)]),
        apellido: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$'), Validators.maxLength(40)]),
        nit: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        dpi: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.pattern('^[0-9]{13}$')]),
        // telefono: new FormControl('', [Validators.required, Validators.pattern('^[2-8]{1}[0-9]{3}[-][0-9]{4}$')]),
        telefono: new FormControl('', [Validators.required, Validators.pattern('^[2-8]{1}[0-9]{3}[-][0-9]{4}$')]),
        direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        fecha: new FormControl('', Validators.required),
        // fecha: new FormControl('', [Validators.required, Validators.pattern('^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$')]),
        envio: new FormControl('', Validators.required),
      },
      {
        validators: this.nitMatchValidator
      }
    );
    // https://www.regextester.com/97987 TESTER DE EXPRESIONES REGULARES

    this.fecha = moment().tz("America/Guatemala").format('YYYY/MM/DD');

    this.client.valueChanges.subscribe(value => {
      this.contador++;
      this.enlazarClienteClase();
      // if (this.contador > 7) {
      //   this.cambiado = true;
      //   this.enlazarClienteClase();
      // }
    });

    this.client.get('nombre').valueChanges.subscribe(value => {
      if (this.contador > 7) {
        this.cambiado = true;
      }
    });

    this.client.get('apellido').valueChanges.subscribe(value => {
      if (this.contador > 7) {
        this.cambiado = true;
      }
    });

    this.client.get('nit').valueChanges.subscribe(value => {
      if (this.contador > 7) {
        this.cambiado = true;
      }
    });

    this.client.get('dpi').valueChanges.subscribe(value => {
      if (this.contador > 7) {
        this.cambiado = true;
      }
    });

    this.client.get('telefono').valueChanges.subscribe(value => {
      if (this.contador > 7) {
        this.cambiado = true;
      }
    });

    this.pedidoService.obtenerTiposEnvio()
      .subscribe(
        res => {
          this.listaEnvios = res;
          // console.log(res);
        },
        err => console.error(err)
      )
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

  cargarCliente(cliente) {
    this.client.get('nombre').setValue((<any>cliente).nombre);
    this.client.get('apellido').setValue((<any>cliente).apellido);
    this.client.get('nit').setValue((<any>cliente).nit);
    this.client.get('dpi').setValue((<any>cliente).dpi);
    this.client.get('telefono').setValue((<any>cliente).telefono);
    this.client.get('correo').setValue((<any>cliente).correo);
    this.client.get('fecha').setValue(moment().tz("America/Guatemala").format('DD/MM/YYYY'));
    this.nickAuxiliar = (<any>cliente).nick;
    // this.datosNuevos.nombre = (<any>cliente).nombre;
    // this.datosNuevos.apellido = (<any>cliente).apellido;
    // this.datosNuevos.nit = (<any>cliente).nit;
    // this.datosNuevos.dpi = (<any>cliente).dpi;
    // this.datosNuevos.nombre = (<any>cliente).nombre;
  }

  async onSubmit(content) {
    // console.log("Entre");
    if (this.cambiado) {
      await this.actualizarCliente();
    }

    this.comprobarItems();
    this.servicioModalAux = this.modalService.open(content, { centered: true, scrollable: true, size: 'lg' });
  }

  onChangeTipoEnvio(idTipo) {
    this.idEnvioAux = idTipo;
    // console.log(idTipo);
  }

  comprobarItems() {
    this.arregloComprobacion.splice(0, this.arregloComprobacion.length);
    this.pedidoService.fieldArray.forEach(async element => {
      const { cantidad } = await this.obtenerProductoEspecifico(element.idproducto);
      let comprobacionAux: ResultadoInventario = {
        idProducto: element.idproducto,
        // cantidadDisp: await this.obtenerProductoEspecifico(element.idproducto),
        cantidadDisp: cantidad,
        cantidadPedida: element.cantidad,
        estado: 0,
        producto: element.producto
      };

      // this.comprobacion.idProducto = element.idProducto;
      // this.comprobacion.cantidadDisp = await this.obtenerProductoEspecifico(element.idProducto);
      // this.comprobacion.cantidadPedida = element.cantidad;

      if (element.cantidad <= comprobacionAux.cantidadDisp) {
        comprobacionAux.estado = 1;
      }
      else {
        if (comprobacionAux.cantidadDisp < 1) {
          comprobacionAux.estado = -1;
        }
        else {
          comprobacionAux.estado = 0;
          comprobacionAux.cantidadPedida = comprobacionAux.cantidadDisp;
        }
      }

      this.arregloComprobacion.push(comprobacionAux);
    });

    console.log(this.arregloComprobacion);
  }

  obtenerProductoEspecifico(id): Promise<any> {
    return new Promise(
      resolve => {
        this.productoService.obtenerProductoEspecifico(id)
          .subscribe(
            res => {
              // this.listaEnvios = res;
              // console.log((<any>res).cantidad);
              resolve({ cantidad: (<any>res).cantidad, descuento: (<any>res).descuento, precio: (<any>res).precio });
            },
            err => console.error(err)
          );
      });
  }

  enlazarClienteClase() {
    this.datosNuevos.nombre = this.client.get('nombre').value;
    this.datosNuevos.apellido = this.client.get('apellido').value;
    this.datosNuevos.nit = this.client.get('nit').value;
    this.datosNuevos.telefono = this.client.get('telefono').value;
    this.datosNuevos.dpi = this.client.get('dpi').value;
    this.datosNuevos.correo = this.client.get('correo').value;
    this.datosNuevos.nick = this.nickAuxiliar;
  }

  actualizarCliente(): Promise<boolean> {
    return new Promise(
      resolve => {
        this.clienteService.actualizarCliente(localStorage.getItem('idUsuario'), this.datosNuevos)
          .subscribe(
            res => {
              resolve(true);
            },
            err => {
              console.error(err)
              resolve(false);
            }
          );
      });
  }

  registrarPedido(): Promise<boolean> {
    return new Promise(
      resolve => {
        this.pedidoService.registrarPedido(this.pedidoService.pedido)
          .subscribe(
            res => {
              // console.log(res);
              resolve(true);
            },
            err => {
              console.error(err)
              resolve(false);
            }
          );
      });
  }

  registrarVentas(cantidad, id): Promise<boolean> {
    return new Promise(
      resolve => {
        this.productoService.registrarVenta(cantidad, id)
          .subscribe(
            res => {
              resolve(true);
            },
            err => {
              console.error(err)
              resolve(false);
            }
          );
      });
  }

  ajustarDetallePedido() {
    this.arregloComprobacion.forEach(async element => {
      if (this.pedidoService.fieldArray.findIndex(x => x.idproducto === element.idProducto) != -1) {
        let index = this.pedidoService.fieldArray.findIndex(x => x.idproducto === element.idProducto);
        this.pedidoService.fieldArray[index].cantidad = element.cantidadPedida;
        const { descuento, precio } = await this.obtenerProductoEspecifico(element.idProducto);
        let descuentoReal = precio - descuento;
        this.pedidoService.fieldArray[index].descuento = descuento > 0 ? (descuentoReal * element.cantidadPedida) : 0.00;
        this.pedidoService.fieldArray[index].subtotal = descuento > 0 ? (precio - descuentoReal) * element.cantidadPedida : (precio * element.cantidadPedida);
      }

    });
  }

  finalizarPedido() {
    this.servicioModalAux.close();
    this.ajustarDetallePedido();

    setTimeout(async () => {
      let total: any = 0;
      let descuento: any = 0;
      this.pedidoService.fieldArray.forEach(element => {
        total += element.subtotal;
        descuento += element.descuento;
      });

      this.pedidoService.crearPedidoGeneral(
        this.client.get('direccion').value, moment().tz("America/Guatemala").format('YYYY/MM/DD'),
        this.idEnvioAux, localStorage.getItem('idUsuario'), total, descuento);

      await this.registrarPedido();

      this.arregloComprobacion.forEach(async element => {
        await this.registrarVentas(element.cantidadPedida, element.idProducto);
      });

      this.pedidoService.pedido = {
        fecha: '',
        direccion: '',
        descuento: 0.00,
        total: 0.00,
        url_comprobante: 'www.s3.coloridosgt.com',
        idtipo_pedido: 0,
        idcliente: 0,
        idestado_pedido: 0,
        idusuario: 0,
        detalle_pedido: new Array<DetallePedido>()
      }

      this.notificacionService.getToastSuccess('Pedido confirmado correctamente', '');

      this.pedidoService.cantidadItems = 0;
      this.pedidoService.fieldArray.splice(0, this.pedidoService.fieldArray.length);
      this.router.navigate(['/shop']);
    }, 1000);

  }

}

// this.firstName.valueChanges.subscribe(value => {
//   console.log('name has changed:', value)
// });