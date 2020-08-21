import { Injectable } from '@angular/core';
import { Servidor } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get(Servidor.API_URI + '/users');
  }
}
