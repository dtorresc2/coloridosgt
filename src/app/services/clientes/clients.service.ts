import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../controllers/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  API_URI_LOCAL = 'http://localhost:3000/api';
  API_URI = 'http://api-rest.coloridosgt.xyz';

  registrarCliente(cliente: Cliente) {
    return this.http.post('http://api-rest.coloridosgt.xyz/registerClient', cliente);
  }

}
