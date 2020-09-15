import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidosService } from '../../services/pedidos/pedidos.service';

@Injectable({
   providedIn: 'root'
})

export class OrdersResolver implements Resolve<Observable<any>> {
   constructor(private pedidosService: PedidosService, private activatedRoute: ActivatedRoute) {}
   
   resolve() {
      return this.pedidosService.obtenerPedidos();
   }
}