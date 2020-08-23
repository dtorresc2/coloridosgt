import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RespuestaUsuario } from 'src/app/controllers/respuestaUsuario';
import { Producto } from 'src/app/controllers/producto';
import { RespuestaUpdate } from 'src/app/controllers/respuestaUpdate';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CategoriasService } from 'src/app/services/productos/categorias.service';
import { Router } from '@angular/router';
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

  comprobador: boolean = false;

  isEdit: boolean = false;
  isDelete: boolean = false;
  isNew: boolean = true;

  idUsuarioAUX: any;
  urlAUX : any;

  listaCategorias: any = [];
  listaProductos: any = [];

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
    buffer: '0'
  }

  respuestaUpdate: RespuestaUpdate = {
    EstadoUpdate: ''
  }

  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.product = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', Validators.required),
        precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})?$')]),
        cantidad: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
        descuento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})?$')]),
        cantidad_minima: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
        categoria: new FormControl('', Validators.required)
        // imagen: new FormControl('', Validators.required)
      }
    );

    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
      this.obtenerListaCategorias();
      this.obtenerListaProductos();
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }
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
    this.product.get('precio').setValue(productoParametro.precio);
    this.product.get('cantidad').setValue(productoParametro.cantidad);
    this.product.get('descuento').setValue(productoParametro.descuento);
    this.product.get('cantidad_minima').setValue(productoParametro.cantidad_minima);
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
    this.product.get('precio').setValue(productoParametro.precio);
    this.product.get('cantidad').setValue(productoParametro.cantidad);
    this.product.get('descuento').setValue(productoParametro.descuento);
    this.product.get('cantidad_minima').setValue(productoParametro.cantidad_minima);
    this.product.get('categoria').setValue(productoParametro.categoria_idcategoria);
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
          // console.log(res);
        },
        err => console.error(err)
      )
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      // console.log(reader.result);
      const base64str = reader.result.toString();
      this.base64Final = base64str.replace(/^data:image\/\w+;base64,/, '');
      // console.log(this.base64Final);
    };
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

    if (this.base64Final == null) {
      this.producto.buffer = '0';
    }

    this.productoService.registrarProducto(this.producto)
      .subscribe(
        res => {

          this.respuesta = res;

          setTimeout(() => {
            this.comprobador = false;
          }, 1500);

          setTimeout(() => {
            if (this.respuesta.Conteo == 0) {
              this.product.reset();
              this.obtenerListaProductos();
            }
            else {
              this.respuesta.Id = 0;
              this.respuesta.EstadoInsert = '';
              this.respuesta.Conteo = 0;
              $('.alert').alert('close');
              this.product.reset();
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
          }, 1500);

          setTimeout(() => {
            if (this.respuestaUpdate.EstadoUpdate == 'Correcto') {
              this.product.reset();
              this.obtenerListaProductos();
              this.creado();
            }
            else {
              this.respuestaUpdate.EstadoUpdate = '';
              $('.alert').alert('close');
              this.product.reset();
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
    keyAUX = arreglo[conteo - 1];
    this.producto.key = keyAUX;
    console.log(this.producto.id, '-', keyAUX);

    this.productoService.eliminarProducto(this.producto)
      .subscribe(
        res => {
          this.respuestaUpdate = res;

          setTimeout(() => {
            this.comprobador = false;
          }, 1500);

          setTimeout(() => {
            if (this.respuestaUpdate.EstadoUpdate == 'Correcto') {
              this.product.reset();
              this.obtenerListaProductos();
              this.creado()
            }
            else {
              this.respuestaUpdate.EstadoUpdate = '';
              $('.alert').alert('close');
              this.product.reset();
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }

}
