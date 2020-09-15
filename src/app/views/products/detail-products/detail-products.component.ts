import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.css']
})
export class DetailProductsComponent implements OnInit {
  idUsuario: any;
  ID: any;

  kardexProducto: any = [];
  codigoProducto: any = 0;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private productoService: ProductosService
  ) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }
    
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.productoService.obtenerKardex(params.id).subscribe(
        res => {
          this.kardexProducto = res;
          this.codigoProducto = params.id;
          // console.log(res);
        },
        err => {
          console.error(err);
          this.router.navigate(['/users']);
        }
      );
    }
    else {
      this.router.navigate(['/users']);
    }
  }

  

}
