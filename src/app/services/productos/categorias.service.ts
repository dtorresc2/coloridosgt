import { Injectable } from '@angular/core';
import { Servidor } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  obtenerCategorias() {
    return this.http.get(Servidor.API_URI + '/categorias');
  }

  registrarCategoria(_nombre, _descripcion, _idusuario) {
    return this.http.post(Servidor.API_URI + '/categorias', { nombre: _nombre, descripcion: _descripcion, idusuario: _idusuario });
  }

  actualizarCategoria(_id, _nombre, _descripcion, _idusuario) {
    return this.http.put(
      Servidor.API_URI + '/categorias/' + _id,
      { nombre: _nombre, descripcion: _descripcion, idusuario: _idusuario }
      // { params: { id: _id } }
    );
  }

  deshabilitarCategoria(_id, _idusuario) {
    return this.http.put(
      Servidor.API_URI + '/categorias',
      { id: _id, idusuario: _idusuario }
      // { params: { id: _id } }
    );
  }

}
