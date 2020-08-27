import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProducto'
})
export class FiltroProductoPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  transform(value: any, args: any): any {
    const resultadoProductos = [];
    
    for (const producto of value) {
      if (producto.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1 || producto.descripcion.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
        resultadoProductos.push(producto);
      };
    };
    return resultadoProductos;
  }

}
