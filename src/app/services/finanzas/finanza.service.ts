import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servidor } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class FinanzaService {

  constructor(private http: HttpClient) { }

  obtenerIngresos(_fechaInicial, _fechaFinal) {
    return this.http.post(Servidor.API_URI + '/ingresos', { fechaInicial: _fechaInicial, fechaFinal: _fechaFinal });
  }

  obtenerGastos(_fechaInicial, _fechaFinal) {
    return this.http.post(Servidor.API_URI + '/gastos', { fechaInicial: _fechaInicial, fechaFinal: _fechaFinal });
  }
}
