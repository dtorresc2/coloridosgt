import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servidor } from '../../config/config';
import { Usuario } from '../../controllers/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  autenticado: boolean = false;
  userName: any = "usuario";
  
  moduloUsuarios: boolean = false;
  moduloPedidos: boolean = false;
  moduloProductos: boolean = false;
  moduloFinanzas: boolean = false;

  constructor(private http: HttpClient) { }

  autenticarUsuario(usuario: Usuario) {
    return this.http.post(Servidor.API_URI + '/login', usuario);
  }

  registrarUsuario(usuario: Usuario) {
    return this.http.post(Servidor.API_URI + '/register', usuario);
  }

  obtenerUsuarios() {
    return this.http.get(Servidor.API_URI + '/users');
  }

  actualizarUsuario(id, usuario: Usuario) {
    return this.http.put(Servidor.API_URI + '/users/' + id, usuario);
  }

  eliminarUsuario(id, usuario) {
    return this.http.delete(Servidor.API_URI + '/users/' + id + '/admin/' + usuario);
  }

  obtenerBitacora(id) {
    return this.http.get(Servidor.API_URI + '/bitacora/' + id);
  }

  // /users/:id/pass
  actualizarPass(id, _usuario, pass) {
    return this.http.put(Servidor.API_URI + '/users/' + id + '/pass', { password: pass, usuario: _usuario });
  }

  // /users/:id/permits
  actualizarPermisos(id, _usuario, _inventario, _ventas, _bitacora_y_usuario) {
    return this.http.put(Servidor.API_URI + '/users/' + id + '/permits', { inventario: _inventario, ventas: _ventas, bitacora_y_usuario: _bitacora_y_usuario, usuario: _usuario });
  }

  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

}
