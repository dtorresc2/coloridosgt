import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/usuarios/users.service';

@Injectable({
  providedIn: 'root'
})
export class GuardPermitsGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private users: UsersService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log((<any>next)._routerState.url);

    if ((<any>next)._routerState.url == '/products' && !this.users.moduloProductos) {
      this.router.navigate(['/home']);
    }

    if ((<any>next)._routerState.url == '/orders' && !this.users.moduloPedidos) {
      this.router.navigate(['/home']);
    }

    if ((<any>next)._routerState.url == '/users' && !this.users.moduloUsuarios) {
      this.router.navigate(['/home']);
    }

    if ((<any>next)._routerState.url == '/accounts' && !this.users.moduloFinanzas) {
      this.router.navigate(['/home']);
    }

    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
