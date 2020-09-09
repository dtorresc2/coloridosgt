import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  listaProductos: any = [];
  show: boolean = true;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
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
    console.log(producto);
    this.modalService.open(content, { centered: true });
    // console.log(id);
  }
}
