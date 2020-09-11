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
import { min } from 'rxjs/operators';
import { Cliente, ClienteActualizacion } from 'src/app/controllers/cliente';

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

  comprobacion: ResultadoInventario = {
    idProducto: 0,
    cantidadDisp: 0,
    cantidadPedida: 0,
    estado: false
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

  constructor(
    private pedidoService: PedidosService,
    private router: Router,
    private clienteService: ClientsService,
    private modalService: NgbModal,
    private productoService: ProductosService) { }

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
        nombre: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$')]),
        apellido: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$')]),
        nit: new FormControl('', [Validators.required]),
        dpi: new FormControl('', [Validators.required]),
        // telefono: new FormControl('', [Validators.required, Validators.pattern('^[2-8]{1}[0-9]{3}[-][0-9]{4}$')]),
        telefono: new FormControl('', [Validators.required, Validators.pattern('^[2-8]{1}[0-9]{3}[-][0-9]{4}$')]),
        direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        fecha: new FormControl('', Validators.required),
        // fecha: new FormControl('', [Validators.required, Validators.pattern('^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$')]),
        envio: new FormControl('', Validators.required),
      }
    );
    // https://www.regextester.com/97987 TESTER DE EXPRESIONES REGULARES

    this.fecha = moment().tz("America/Guatemala").format('YYYY/MM/DD');

    this.client.valueChanges.subscribe(value => {
      this.contador++;
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

  cargarCliente(cliente) {
    this.client.get('nombre').setValue((<any>cliente).nombre);
    this.client.get('apellido').setValue((<any>cliente).apellido);
    this.client.get('nit').setValue((<any>cliente).nit);
    this.client.get('dpi').setValue((<any>cliente).dpi);
    this.client.get('telefono').setValue((<any>cliente).telefono);
    this.client.get('correo').setValue((<any>cliente).correo);
    this.client.get('fecha').setValue(moment().tz("America/Guatemala").format('DD/MM/YYYY'));

    // this.datosNuevos.nombre = (<any>cliente).nombre;
    // this.datosNuevos.apellido = (<any>cliente).apellido;
    // this.datosNuevos.nit = (<any>cliente).nit;
    // this.datosNuevos.dpi = (<any>cliente).dpi;
    // this.datosNuevos.nombre = (<any>cliente).nombre;
  }

  onSubmit(content) {
    // console.log("Entre");
    this.modalService.open(content, { centered: true, scrollable: true5 });
    this.comprobarItems();
  }

  onChangeTipoEnvio(idTipo) {
    this.idEnvioAux = idTipo;
    // console.log(idTipo);
  }

   comprobarItems() {
    this.pedidoService.fieldArray.forEach(async element => {
      let comprovacionAux: ResultadoInventario = {
        idProducto : element.idProducto,
        cantidadDisp: await this.obtenerProductoEspecifico(element.idProducto),
        cantidadPedida: element.cantidad,
        estado: false
      };

      // this.comprobacion.idProducto = element.idProducto;
      // this.comprobacion.cantidadDisp = await this.obtenerProductoEspecifico(element.idProducto);
      // this.comprobacion.cantidadPedida = element.cantidad;

      if (element.cantidad <= await this.obtenerProductoEspecifico(element.idProducto)) {
        comprovacionAux.estado = true;
      }
      else {
        comprovacionAux.estado = false;
      }

      this.arregloComprobacion.push(comprovacionAux);
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
              resolve((<any>res).cantidad);
            },
            err => console.error(err)
          );
      });
  }
}

// this.firstName.valueChanges.subscribe(value => {
//   console.log('name has changed:', value)
// });