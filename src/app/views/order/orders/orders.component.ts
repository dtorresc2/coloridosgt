import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { read } from '@popperjs/core';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';
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
  comprobador: boolean = false;

  page = 1;
  pageSize = 10;

  fileToUpload: File = null;
  nombreArchivo: any;
  base64Final: string = null;
  urlAUX: any;
  idPedidoAUX: any;

  constructor(private pedidosServicio: PedidosService, private router: Router, private modalService: NgbModal, private notifiacionService: NotificacionService) { }

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
          // console.log(res);
        },
        err => console.error(err)
      );
  }

  verDetalle(id) {
    this.router.navigate(['order/list', id, 'detail']);
  }

  abrirModalComprobante(content, idPedido) {
    this.base64Final = null;
    this.nombreArchivo = '';
    this.idPedidoAUX = idPedido;
    this.servicioModal = this.modalService.open(content, { centered: true });
  }

  abrirModalImagen(content, url, id) {
    this.idPedidoAUX = id;
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
  }

  enviarComprobante() {
    if (this.base64Final != null) {
      this.comprobador = true;

      this.pedidosServicio.actualiazarComprobante(this.idPedidoAUX, this.base64Final, this.idUsuario)
        .subscribe(
          res => {

            setTimeout(() => {
              this.comprobador = false;
              this.servicioModal.close();
            }, 1500);

            setTimeout(() => {
              if ((<any>res).EstadoUpdate == 'Correcto') {
                this.notifiacionService.getToastSuccess('Producto registrado correctamente', '');
              }
              else {
                this.notifiacionService.getToastError('Fallo al registrar producto', '');
              }
              this.obtenerPedidos();

            }, 1000);

          },
          err => console.error(err)
        );
    }
  }

}
