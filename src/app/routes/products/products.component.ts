import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/productos/categorias.service';
import { Producto } from 'src/app/controllers/producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  ID: any;
  idUsuario: any;
  fileToUpload: File = null;
  nombreArchivo: any;
  base64Final: string;
  product: FormGroup;

  comprobador: boolean = false;

  isEdit: boolean = false;
  isDelete: boolean = false;
  isNew: boolean = true;

  idUsuarioAUX: any;

  listaCategorias: any = [];
  listaProductos: any = [];

  producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0.00,
    cantidad: 0,
    descuento: 0.00,
    cantidad_minima: 0,
    categoria_idcategoria: 0,
    buffer: ''
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
      // this.guardarCliente();
    }

    if (this.isEdit) {
      console.log("Voy a editar")
      // this.editarCliente();
    }

    if (this.isDelete) {
      console.log("Voy a eliminar");
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

    this.product.get('nombre').setValue(productoParametro.nombre);
    this.product.get('descripcion').setValue(productoParametro.descripcion);
    this.product.get('precio').setValue(productoParametro.precio);
    this.product.get('cantidad').setValue(productoParametro.cantidad);
    this.product.get('descuento').setValue(productoParametro.descuento);
    this.product.get('cantidad_minima').setValue(productoParametro.cantidad_minima);
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


    // console.log(this.fileToUpload);
    // this.nombreArchivo = this.fileToUpload.name;
  }

  // fileToBufer(){
  //   const base64str = base64.replace(/^data:image\/\w+;base64,/, '');
  //   return Buffer.from(base64str, 'base64');
  // }


  // CAMPOS
  // { nombre, descripcion, precio, cantidad, descuento, cantidad_minima, categoria_idcategoria }, url_imagen
}
