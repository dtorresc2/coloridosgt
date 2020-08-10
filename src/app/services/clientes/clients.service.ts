import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../controllers/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  API_URI_LOCAL = 'http://localhost:3000/';
  API_URI = 'http://api-rest.coloridosgt.xyz';

  registrarCliente(cliente: Cliente) {
    console.log(cliente);
    return this.http.post(this.API_URI + '/registerClient', cliente);
  }

}
