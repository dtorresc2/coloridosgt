import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private toastr: ToastrService) { }

  getToastSuccess(title, desc) {
    this.toastr.success(title, desc, {
      closeButton: true,
      toastClass: 'ngx-toastr bg-success',
      titleClass: 'toast-title text-white',
      timeOut: 2000
    });
  }

  getToastError(title, desc) {
    this.toastr.error(title, desc, {
      closeButton: true,
      toastClass: 'ngx-toastr bg-danger',
      titleClass: 'toast-title text-white',
      timeOut: 2000
    });
  }

  getToastCaution(title, desc) {
    this.toastr.warning(title, desc, {
      closeButton: true,
      toastClass: 'ngx-toastr bg-warning',
      titleClass: 'toast-title text-white',
      timeOut: 2000
    });
  }
}
