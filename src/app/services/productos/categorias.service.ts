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

  registrarCategoria(_nombre, _descripcion) {
    return this.http.post(Servidor.API_URI + '/categorias', { nombre: _nombre, descripcion: _descripcion });
  }
}
