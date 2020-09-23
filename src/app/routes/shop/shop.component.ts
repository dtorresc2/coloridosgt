import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { DetallePedido } from 'src/app/controllers/pedido';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  listaProductos: any = [];
  show: boolean = true;
  servicioModal: any;

  // Variables auxiliares de productos
  idProductoAux: any;
  productoAux: any;
  cantidadAux: any = 1;
  cantidadProducto: any = 0;
  precioU: any = 0.00;
  descuentoAux: any = 0.00;

  detallePedido: DetallePedido = {
    idproducto: 0,
    cantidad: 0,
    precio_unidad: 0.00,
    subtotal: 0.00,
    descuento: 0.00,
    descripcion: '',
    producto: '',
    descuento_real: 0.00
  }

  page = 1;
  pageSize = 10;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private pedidosService: PedidosService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.clientService.autenticado = true;
    }
    else {
      this.clientService.autenticado = false;
    }

    setTimeout(() => {
      // this.obtenerListaProductos();
      this.listaProductos = this.activatedRoute.snapshot.data.shop;
      // console.log(this.listaProductos);
      this.show = false;
    }, 1000);

  }

  obtenerListaProductos() {
    this.productoService.obtenerProductos()
      .subscribe(
        res => {
          this.listaProductos = res;
          this.show = false;
        },
        err => console.error(err)
      );
  }

  abrirModalCantidad(content, producto) {
    // console.log(this.cantidadAux);
    this.idProductoAux = producto.idproducto;
    this.productoAux = producto.nombre;
    this.cantidadProducto = producto.cantidad;
    this.precioU = producto.precio;
    this.descuentoAux = producto.descuento;
    
    this.cantidadAux = 1;
    this.servicioModal = this.modalService.open(content, { centered: true });
    // this.servicioModal.close();
    // console.log(id);
  }

  agregarCarrito() {
    this.detallePedido.idproducto = this.idProductoAux;
    this.detallePedido.cantidad = this.cantidadAux;
    this.detallePedido.precio_unidad = this.precioU;
    this.detallePedido.producto = this.productoAux;

    let descuentoReal = this.precioU - this.descuentoAux;
    // console.log(descuentoReal);
    this.detallePedido.descuento_real = descuentoReal;
    this.detallePedido.descuento = this.descuentoAux > 0 ? descuentoReal * this.cantidadAux : 0.00;
    this.detallePedido.subtotal = this.descuentoAux > 0 ? (this.precioU - descuentoReal) * this.cantidadAux : (this.precioU * this.cantidadAux);
    this.detallePedido.descripcion = this.descuentoAux > 0 ? this.productoAux + ' (-' + descuentoReal.toFixed(2).toString() + ' c/u)' : this.productoAux;
    // console.log(this.cantidadAux,'-', this.productoAux);
    // console.log(this.detallePedido);

    this.pedidosService.agregarPedido(this.detallePedido);
    // console.log(this.pedidosService.fieldArray.length);
    this.notificacionService.getToastSuccess('Producto agregado correctamente','');
    this.servicioModal.close();
  }
}
