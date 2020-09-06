import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clientes/clients.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor (private clientService: ClientsService, private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let rutaSolicitada;
      console.log((<any>next)._routerState.url);
      // console.log(state);

      if (!this.clientService.autenticado) {
        this.router.navigate(['/']);
      }

      // rutaSolicitada = (<any>next)._routerState.url;

      // if (rutaSolicitada == '/dashboard'){
      //   this.router.navigate(['/dashboard']);
      // }
      

      return this.clientService.autenticado;
      // return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    // return this.permissions.canActivate(this.currentUser, route.params.id);
    // return true;
    if (!this.clientService.autenticado) {
      this.router.navigate(['/']);
    }
    
    return this.clientService.autenticado;
  }
  
}
