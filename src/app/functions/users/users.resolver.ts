import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/usuarios/users.service';

@Injectable({
   providedIn: 'root'
})

export class UsersResolver implements Resolve<Observable<any>> {
   constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {}
   
   resolve() {
      return this.usersService.obtenerUsuarios();
   }
}