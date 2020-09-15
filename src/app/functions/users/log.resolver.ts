import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/usuarios/users.service';

@Injectable({
   providedIn: 'root'
})

export class LogResolver implements Resolve<Observable<any>> {
   constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {}
   
   resolve() {
      // route.firstChild.snapshot.params['id']
      console.log(this.activatedRoute.snapshot.params);
      return this.usersService.obtenerBitacora(this.activatedRoute.snapshot.params.id);
   }
}