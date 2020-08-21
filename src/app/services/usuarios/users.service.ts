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

  autenticarUsuario(usuario: Usuario) {
    return this.http.post(Servidor.API_URI + '/login', usuario);
  }

  registrarUsuario(usuario: Usuario){
    return this.http.post(Servidor.API_URI + '/register', usuario);
  }

  obtenerUsuarios(){
    return this.http.get(Servidor.API_URI + '/users');
  }

}
