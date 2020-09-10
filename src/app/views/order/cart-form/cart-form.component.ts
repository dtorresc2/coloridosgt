import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent implements OnInit {
  client: FormGroup;

  constructor(private pedidoService: PedidosService, private router: Router, private clienteService: ClientsService) { }

  ngOnInit(): void {
    if (localStorage['idUsuario'] && this.pedidoService.cantidadItems > 0) {
      this.clienteService.obtenerCliente(localStorage.getItem('idUsuario'))
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        );
    }
    // else {
    //   this.router.navigate(['/dashboard']);
    // }
  }
}

// this.firstName.valueChanges.subscribe(value => {
//   console.log('name has changed:', value)
// });
