import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPedidos'
})
export class FiltroPedidosPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultadoPedidos = [];
    
    for (const pedido of value) {
      if (pedido.cliente.toLowerCase().indexOf(args.toLowerCase()) > -1 || pedido.direccion.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
        resultadoPedidos.push(pedido);
      };
    };
    return resultadoPedidos;
  }

}
