import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../controllers/cliente';
import { Servidor } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  autenticado : boolean;

  constructor(private http: HttpClient) { }

  registrarCliente(cliente: Cliente) {
    // console.log(cliente);
    return this.http.post(Servidor.API_URI + '/registerClient', cliente);
  }

  autenticarCliente(cliente: Cliente) {
    return this.http.post(Servidor.API_URI + '/loginClient', cliente);
  }
  

}
