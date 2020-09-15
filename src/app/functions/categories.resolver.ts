import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriasService } from '../services/productos/categorias.service';

@Injectable({
   providedIn: 'root'
})

export class CategoryResolver implements Resolve<Observable<any>> {
   constructor(private categoriasService: CategoriasService, private activatedRoute: ActivatedRoute) {}
   
   resolve() {
      return this.categoriasService.obtenerCategorias();
   }
}