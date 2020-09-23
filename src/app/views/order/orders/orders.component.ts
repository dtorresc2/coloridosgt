import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { read } from '@popperjs/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  idUsuario: any;
  listaPedidos: any = [];
  servicioModal: any;

  page = 1;
  pageSize = 10;

  fileToUpload: File = null;
  nombreArchivo: any;
  base64Final: string = null;
  urlAUX: any;

  constructor(private pedidosServicio: PedidosService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (localStorage['idUsuario']) {
      this.idUsuario = localStorage.getItem('idUsuario');
    }
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidosServicio.obtenerPedidosCliente(this.idUsuario)
      .subscribe(
        res => {
          this.listaPedidos = res;
          console.log(res);
        },
        err => console.error(err)
      );
  }

  verDetalle(id) {
    this.router.navigate(['order/list', id, 'detail']);
  }

  abrirModalComprobante(content, idPedido) {
    this.servicioModal = this.modalService.open(content, { centered: true });
  }

  abrirModalImagen(content, url){
    this.urlAUX = url;
    this.modalService.open(content, { centered: true });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();

    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      const base64str = reader.result.toString();
      console.log(this.fileToUpload.name);
      this.nombreArchivo = this.fileToUpload.name;
      this.base64Final = base64str.replace(/^data:image\/\w+;base64,/, '');
    };

    // this.ng2ImgMax.compressImage(this.fileToUpload, 0.075).subscribe(
    //   result => {
    //     reader.readAsDataURL(result);
    //     reader.onload = () => {
    //       const base64str = reader.result.toString();
    //       this.base64Final = base64str.replace(/^data:image\/\w+;base64,/, '');
    //     };
    //   },
    //   error => {
    //     console.log('😢 Oh no!', error);
    //   }
    // );
  }

}
