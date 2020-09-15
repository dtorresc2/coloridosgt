import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClientsService } from '../services/clientes/clients.service';

@Injectable({
   providedIn: 'root'
})

export class LogResolver implements Resolve<Observable<any>> {
   constructor(private clientService: ClientsService, private activatedRoute: ActivatedRoute) {}
   
   resolve() {
      // return of ('Hola');
      return this.clientService.obtenerBitacora(localStorage.getItem('idUsuario'));
      // .pipe(
      //    delay(2000)
      // );
   }
}