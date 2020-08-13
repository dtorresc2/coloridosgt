import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servidor } from '../../config/config';
import { Usuario } from '../../controllers/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  autenticado : boolean = false;
  
  constructor(private http: HttpClient) { }

  autenticarCliente(usuario: Usuario) {
    return this.http.post(Servidor.API_URI + '/login', usuario);
  }
}
