import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clientes/clients.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  listaProductos: any = [];

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.clientService.autenticado = true;
    }
    else {
      this.clientService.autenticado = false;
    }
    this.obtenerListaProductos();
    console.log(this.activatedRoute.snapshot.data);
  }

  obtenerListaProductos() {
    this.productoService.obtenerProductos()
      .subscribe(
        res => {
          this.listaProductos = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }
}
