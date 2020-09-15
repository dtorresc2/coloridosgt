import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/usuarios/users.service';

@Component({
  selector: 'app-bitacora-users',
  templateUrl: './bitacora-users.component.html',
  styleUrls: ['./bitacora-users.component.css']
})
export class BitacoraUsersComponent implements OnInit {
  idUsuario: any;
  ID: any;
  listaBitacora: any = [];

  // Paginacion
  page = 1;
  pageSize = 10;

  // Loader
  show: boolean = true;

  constructor(private router: Router, private activedRoute: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';

      setTimeout(() => {
        // this.listaBitacora = this.activedRoute.snapshot.data.log;
        const params = this.activedRoute.snapshot.params;
        if (params.id) {
          this.obtenerBitacora(params.id);
        }
        else {
          this.router.navigate(['/users']);
        }
        // this.obtenerBitacora();
        this.show = false;
      }, 1000);
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }
  }

  obtenerBitacora(id) {
    this.usersService.obtenerBitacora(id).subscribe(
      res => {
        this.listaBitacora = res;
      },
      err => {
        console.error(err);
        this.router.navigate(['/users']);
      }
    );
  }

}
