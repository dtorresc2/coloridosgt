import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RespuestaUsuario } from 'src/app/controllers/respuestaUsuario';
import { Producto } from 'src/app/controllers/producto';
import { RespuestaUpdate } from 'src/app/controllers/respuestaUpdate';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CategoriasService } from 'src/app/services/productos/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService } from 'src/app/services/toasts/toasts.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

declare var $: any; // jQuery

@Component({
  selector: 'app-dash-products',
  templateUrl: './dash-products.component.html',
  styleUrls: ['./dash-products.component.css']
})
export class DashProductsComponent implements OnInit {
  ID: any;
  idUsuario: any;
  fileToUpload: File = null;
  nombreArchivo: any;
  base64Final: string = null;

  product: FormGroup;
  categoria: FormGroup;
  formCosto: FormGroup;

  comprobador: boolean = false;
  comprobadorCat: boolean = false;

  isEdit: boolean = false;
  isDelete: boolean = false;
  isNew: boolean = true;

  isEditCat: boolean = false;
  isDeleteCat: boolean = false;
  isNewCat: boolean = true;

  idUsuarioAUX: any;
  urlAUX: any;
  idCategoriaAUX: any;
  idObjetoAux: any;

  listaCategorias: any = [];
  listaProductos: any = [];

  // Paginacion
  page = 1;
  pageSize = 10;

  // Modal Form
  modalFormProducto: any;

  // Loader
  show: boolean = true;

  respuesta: RespuestaUsuario = {
    EstadoInsert: '',
    Id: 0,
    Conteo: 0
  }

  producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0.00,
    cantidad: 0,
    descuento: 0.00,
    cantidad_minima: 0,
    categoria_idcategoria: 0,
    buffer: '0',
    idusuario: 0
  }

  respuestaUpdate: RespuestaUpdate = {
    EstadoUpdate: ''
  }

  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriasService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private notifiacionService: NotificacionService,
    private activatedRoute: ActivatedRoute,
    private ng2ImgMax: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    // Form de productos
    this.product = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$')]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      descuento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$')]),
      cantidad_minima: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      categoria: new FormControl('', Validators.required)
      // imagen: new FormControl('', Validators.required)
    });

    // Form de categorias
    this.categoria = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required)
    });

    this.formCosto = new FormGroup({
      cantidad: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      costo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$')])
    });

    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
      // this.obtenerListaCategorias();
      // this.obtenerListaProductos();

      setTimeout(() => {
        this.listaProductos = this.activatedRoute.snapshot.data.products;
        this.listaCategorias = this.activatedRoute.snapshot.data.categories;
        this.show = false;
      }, 1000);

    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }

    this.product.get('cantidad').setValue(0);
  }

  onSubmit() {
    this.comprobador = true;

    if (this.isNew) {
      console.log("Voy a crear")
      this.guardarProducto();
    }

    if (this.isEdit) {
      console.log("Voy a editar")
      this.editarProducto();
    }

    if (this.isDelete) {
      console.log("Voy a eliminar");
      this.eliminarProducto();
    }
  }

  creado() {
    this.product.reset();
    this.isEdit = false;
    this.isDelete = false;
    this.isNew = true;
    this.product.get('cantidad').setValue(0);
  }

  editado(id, productoParametro) {
    // console.log(productoParametro);
    // console.log(id, '-', usuarioParametro.correo, '-', usuarioParametro.nombrerol);
    this.product.reset();
    this.isEdit = true;
    this.isDelete = false;
    this.isNew = false;

    this.idUsuarioAUX = id;
    this.base64Final = null;

    this.product.get('nombre').setValue(productoParametro.nombre);
    this.product.get('descripcion').setValue(productoParametro.descripcion);
    this.product.get('precio').setValue(parseFloat(productoParametro.precio).toFixed(2));
    this.product.get('cantidad').setValue(productoParametro.cantidad);
    this.product.get('descuento').setValue(parseFloat(productoParametro.descuento).toFixed(2));
    this.product.get('cantidad_minima').setValue(productoParametro.cantidad_minima);
    this.product.get('categoria').setValue(productoParametro.idcategoria);
  }

  eliminado(id, productoParametro) {
    // console.log(productoParametro);
    // console.log(id, '-', usuarioParametro.correo, '-', usuarioParametro.nombrerol);
    this.product.reset();
    this.isEdit = false;
    this.isDelete = true;
    this.isNew = false;

    this.idUsuarioAUX = id;
    this.urlAUX = productoParametro.url_imagen;
    this.base64Final = null;

    this.product.get('nombre').setValue(productoParametro.nombre);
    this.product.get('descripcion').setValue(productoParametro.descripcion);
    this.product.get('precio').setValue(parseFloat(productoParametro.precio).toFixed(2));
    this.product.get('cantidad').setValue(productoParametro.cantidad);
    this.product.get('descuento').setValue(parseFloat(productoParametro.descuento).toFixed(2));
    this.product.get('cantidad_minima').setValue(productoParametro.cantidad_minima);
    this.product.get('categoria').setValue(productoParametro.idcategoria);
  }

  inventario(id) {
    this.router.navigate(['products', id]);
  }

  obtenerListaCategorias() {
    this.categoriaService.obtenerCategorias()
      .subscribe(
        res => {
          this.listaCategorias = res;
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  obtenerListaProductos() {
    this.productoService.obtenerProductos()
      .subscribe(
        res => {
          this.listaProductos = res;
          console.log(res);
        },
        err => console.error(err)
      )
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    let uploadedImage;

    // reader.readAsDataURL(this.fileToUpload);
    // reader.onload = () => {
    //   const base64str = reader.result.toString();
    //   this.base64Final = base64str.replace(/^data:image\/\w+;base64,/, '');
    // };

    this.ng2ImgMax.compressImage(this.fileToUpload, 0.075).subscribe(
      result => {
        // uploadedImage = result;
        // uploadedImage = new File([result], result.name);
        // console.log(uploadedImage);
        reader.readAsDataURL(result);
        reader.onload = () => {
          const base64str = reader.result.toString();
          this.base64Final = base64str.replace(/^data:image\/\w+;base64,/, '');
        };
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }

  // Registrar Cliente
  guardarProducto() {
    this.producto.nombre = this.product.get('nombre').value;
    this.producto.descripcion = this.product.get('descripcion').value;
    this.producto.precio = this.product.get('precio').value;
    this.producto.cantidad = this.product.get('cantidad').value;
    this.producto.cantidad_minima = this.product.get('cantidad_minima').value;
    this.producto.descuento = this.product.get('descuento').value;
    this.producto.buffer = this.base64Final;
    this.producto.categoria_idcategoria = this.product.get('categoria').value;
    this.producto.idusuario = this.idUsuario;

    if (this.base64Final == null) {
      this.producto.buffer = '0';
    }

    this.productoService.registrarProducto(this.producto)
      .subscribe(
        res => {

          this.respuesta = res;

          setTimeout(() => {
            this.comprobador = false;
            this.modalFormProducto.close();
          }, 1500);

          setTimeout(() => {
            if (this.respuesta.Conteo == 0) {
              this.product.reset();
              this.obtenerListaProductos();
              this.notifiacionService.getToastSuccess('Producto registrado correctamente', '');
            }
            else {
              this.respuesta.Id = 0;
              this.respuesta.EstadoInsert = '';
              this.respuesta.Conteo = 0;
              $('.alert').alert('close');
              this.product.reset();
              this.notifiacionService.getToastError('Fallo al registrar producto', '');
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

  editarProducto() {
    let imgAux: any = "0";
    this.producto.nombre = this.product.get('nombre').value;
    this.producto.descripcion = this.product.get('descripcion').value;
    this.producto.precio = this.product.get('precio').value;
    this.producto.cantidad = this.product.get('cantidad').value;
    this.producto.cantidad_minima = this.product.get('cantidad_minima').value;
    this.producto.descuento = this.product.get('descuento').value;
    this.producto.buffer = this.base64Final;
    this.producto.categoria_idcategoria = this.product.get('categoria').value;
    this.producto.idusuario = this.idUsuario;


    if (this.base64Final == null) {
      this.producto.buffer = '0';
      imgAux = "0"
    }
    else {
      imgAux = "1"
    }

    this.productoService.editarProducto(this.idUsuarioAUX, imgAux, this.producto)
      .subscribe(
        res => {
          this.respuestaUpdate = res;

          setTimeout(() => {
            this.comprobador = false;
            this.modalFormProducto.close();
          }, 1500);

          setTimeout(() => {
            if (this.respuestaUpdate.EstadoUpdate == 'Correcto') {
              this.product.reset();
              this.obtenerListaProductos();
              this.creado();
              this.notifiacionService.getToastSuccess('Producto actualizado correctamente', '');
            }
            else {
              this.respuestaUpdate.EstadoUpdate = '';
              $('.alert').alert('close');
              this.product.reset();
              this.notifiacionService.getToastError('Fallo al actualizar producto', '');
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

  eliminarProducto() {
    let arreglo = this.urlAUX.split('/');
    let conteo = arreglo.length;
    let keyAUX;

    this.producto.id = this.idUsuarioAUX;
    this.producto.idusuario = this.idUsuario;

    keyAUX = arreglo[conteo - 1];
    this.producto.key = keyAUX;
    console.log(this.producto.id, '-', keyAUX);

    this.productoService.eliminarProducto(this.producto)
      .subscribe(
        res => {
          this.respuestaUpdate = res;

          setTimeout(() => {
            this.comprobador = false;
            this.modalFormProducto.close();
          }, 1500);

          setTimeout(() => {
            if (this.respuestaUpdate.EstadoUpdate == 'Correcto') {
              this.product.reset();
              this.obtenerListaProductos();
              this.creado()
              this.notifiacionService.getToastSuccess('Producto eliminado correctamente', '');
            }
            else {
              this.respuestaUpdate.EstadoUpdate = '';
              $('.alert').alert('close');
              this.product.reset();
              this.notifiacionService.getToastError('Fallo al eliminar producto', '');
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

  // Funciones para abrir los distintos modales
  openScrollableContent(longContent, url, id) {
    this.urlAUX = url;
    this.idObjetoAux = id;
    this.modalService.open(longContent, { centered: true });
    // console.log(id);
  }

  abrirModalCantidad(content, id) {
    // this.urlAUX = url;
    this.idObjetoAux = id;
    this.modalService.open(content, { centered: true });
    // console.log(id);
  }

  abrirModalCostos(content, id) {
    // this.urlAUX = url;
    this.idObjetoAux = id;
    this.modalService.open(content, { centered: true, size: 'lg' });
    // console.log(id);
  }

  abrirModalForm(content) {
    this.modalFormProducto = this.modalService.open(content, { centered: true, size: 'lg', scrollable: true });
  }

  showSuccess() {
    this.toastr.success('Creado Correctamente', '', {
      closeButton: true,
      toastClass: 'ngx-toastr bg-primary',
      titleClass: 'toast-title text-white',
      timeOut: 1000
    });
  }

  showError() {

  }

  // CATEGORIAS ====================================
  abrirMantenimientosCat(content) {
    // this.urlAUX = url;
    this.modalService.open(content, {size: 'lg', scrollable: true });
    this.categoria.reset();
    // console.log(id);
  }

  onSubmitCategoria() {
    this.comprobadorCat = true;

    if (this.isNewCat) {
      // console.log("Voy a crear una categoria")
      this.guardarCategoria();
    }

    if (this.isEditCat) {
      // console.log("Voy a editar una categoria")
      this.editarCategoria();
    }

    if (this.isDeleteCat) {
      // console.log("Voy a eliminar un categoria");
      this.eliminarCategoria();
    }

  }

  creadoCat() {
    this.categoria.reset();
    this.isEditCat = false;
    this.isDeleteCat = false;
    this.isNewCat = true;
  }

  editadoCat(id, categoriaParametro) {
    this.categoria.reset();
    this.isEditCat = true;
    this.isDeleteCat = false;
    this.isNewCat = false;

    this.idCategoriaAUX = id;

    this.categoria.get('nombre').setValue(categoriaParametro.nombre);
    this.categoria.get('descripcion').setValue(categoriaParametro.descripcion);
  }

  eliminadoCat(id, categoriaParametro) {
    this.categoria.reset();
    this.isEditCat = false;
    this.isDeleteCat = true;
    this.isNewCat = false;

    this.idCategoriaAUX = id;

    this.categoria.get('nombre').setValue(categoriaParametro.nombre);
    this.categoria.get('descripcion').setValue(categoriaParametro.descripcion);
  }

  // Registrar Cliente
  guardarCategoria() {
    this.categoriaService.registrarCategoria(
      this.categoria.get('nombre').value,
      this.categoria.get('descripcion').value,
      this.idUsuario
    ).subscribe(
      res => {

        this.respuesta = res;

        setTimeout(() => {
          this.comprobadorCat = false;
        }, 1500);

        setTimeout(() => {
          if (this.respuesta.Conteo == 0) {
            this.categoria.reset();
            this.obtenerListaCategorias();
            this.notifiacionService.getToastSuccess('Categoria registrada correctamente', '');
          }
          else {
            this.respuesta.Id = 0;
            this.respuesta.EstadoInsert = '';
            this.respuesta.Conteo = 0;
            this.notifiacionService.getToastError('Fallo al registrar categoria', '');
            // $('.alert').alert('close');
            // this.product.reset();
          }
        }, 1000);
      },
      err => console.error(err)
    );
  }

  editarCategoria() {
    this.categoriaService.actualizarCategoria(
      this.idCategoriaAUX,
      this.categoria.get('nombre').value,
      this.categoria.get('descripcion').value,
      this.idUsuario
    ).subscribe(
      res => {
        this.respuestaUpdate = res;

        setTimeout(() => {
          this.comprobadorCat = false;
        }, 1500);

        setTimeout(() => {
          if (this.respuestaUpdate.EstadoUpdate == 'Correcto') {
            this.categoria.reset();
            this.obtenerListaCategorias();
            this.creadoCat();
            this.notifiacionService.getToastSuccess('Categoria actualizada correctamente', '');
          }
          else {
            this.respuestaUpdate.EstadoUpdate = '';
            this.notifiacionService.getToastError('Fallo al actualizar categoria', '');
            // $('.alert').alert('close');
            // this.product.reset();
          }
        }, 1000);
      },
      err => console.error(err)
    );
  }

  eliminarCategoria() {
    this.categoriaService.deshabilitarCategoria(this.idCategoriaAUX, this.idUsuario)
      .subscribe(
        res => {
          this.respuestaUpdate = res;

          setTimeout(() => {
            this.comprobadorCat = false;
          }, 1500);

          setTimeout(() => {
            if (this.respuestaUpdate.EstadoUpdate == 'Correcto') {
              this.categoria.reset();
              this.obtenerListaCategorias();
              this.creado()
              this.notifiacionService.getToastSuccess('Categoria eliminada correctamente', '');
            }
            else {
              this.respuestaUpdate.EstadoUpdate = '';
              this.notifiacionService.getToastError('Fallo al eliminar categoria', '');
              // $('.alert').alert('close');
              // this.product.reset();
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

  // GESTION DE COMPRAS ==================
  onSubmitCostoProducto() {
    this.comprobadorCat = true;

    this.productoService.registrarCantidadProducto(
      this.idObjetoAux,
      this.formCosto.get('costo').value,
      this.formCosto.get('cantidad').value,
      this.idUsuario)
      .subscribe(
        res => {
          setTimeout(() => {
            this.comprobadorCat = false;
          }, 1500);

          setTimeout(() => {
            if ((<any>res).CantidadRecuento && (<any>res).CostosDisponibles) {
              this.formCosto.reset();
              this.obtenerListaProductos();
              this.notifiacionService.getToastSuccess('Mercaderia almacenada correctamente', '');
            }
            else {
              this.notifiacionService.getToastError('Fallo al almacenar mercaderia', '');
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

}
