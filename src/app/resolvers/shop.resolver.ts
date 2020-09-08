import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
   providedIn: 'root'
})

export class ShopResolver implements Resolve<Observable<any>> {
   resolve() {
      return of ('Hola');
   }
}