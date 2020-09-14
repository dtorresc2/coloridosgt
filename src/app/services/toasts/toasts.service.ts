import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private toastr: ToastrService) { }

  getToastSuccess(title) {
    this.toastr.success(title, '', {
      closeButton: true,
      toastClass: 'ngx-toastr bg-success',
      titleClass: 'toast-title text-white',
      timeOut: 2000
    });
  }

  getToastError(title) {
    this.toastr.error(title, '', {
      closeButton: true,
      toastClass: 'ngx-toastr bg-danger',
      titleClass: 'toast-title text-white',
      timeOut: 2000
    });
  }

}
