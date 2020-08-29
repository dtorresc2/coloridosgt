import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuario'
})
export class FiltroUsuarioPipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  transform(value: any, args: any): any {
    const resultadoUsuarios = [];
    
    for (const user of value) {
      if (user.nombrerol.toLowerCase().indexOf(args.toLowerCase()) > -1 || user.correo.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
        resultadoUsuarios.push(user);
      };
    };
    return resultadoUsuarios;
  }

}
