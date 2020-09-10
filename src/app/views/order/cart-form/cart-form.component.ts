import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clientes/clients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

    this.client = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$')]),
        apellido: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]+([" "]{0,1}[A-Z]{1}[a-z]+){0,1}$')]),
        nit: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        dpi: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        // telefono: new FormControl('', [Validators.required, Validators.pattern('^[2-8]{1}[0-9]{3}[-][0-9]{4}$')]),
        telefono: new FormControl('', [Validators.required, Validators.pattern('^[2-8]{1}[0-9]{3}[-][0-9]{4}$')]),
        direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        fecha: new FormControl('', Validators.required),
        // fecha: new FormControl('', [Validators.required, Validators.pattern('^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$')]),
        envio: new FormControl('', Validators.required),
      }
    );
    // https://www.regextester.com/97987 TESTER DE EXPRESIONES REGULARES
  }

  onSubmit(){
    console.log("Entre");
  }
}

// this.firstName.valueChanges.subscribe(value => {
//   console.log('name has changed:', value)
// });
