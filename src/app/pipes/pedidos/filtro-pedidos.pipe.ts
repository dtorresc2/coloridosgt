import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPedidos'
})
export class FiltroPedidosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
