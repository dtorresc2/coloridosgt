import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/productos/categorias.service';

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

  listaCategorias: any = [];

  constructor(private usersService: UsersService, private categoriaService: CategoriasService, private router: Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
      this.obtenerListaCategorias();
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
        console.log(reader.result);
        const base64str = reader.result.toString();
        base64str.replace(/^data:image\/\w+;base64,/, '');
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
