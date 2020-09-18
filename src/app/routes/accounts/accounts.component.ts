import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FinanzaService } from 'src/app/services/finanzas/finanza.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  ID: any;
  idUsuario: any;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  listaIngresos: any = [];
  listaGastos: any = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public finazaServices: FinanzaService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');

    if (this.idUsuario > 0) {
      this.ID = 'Registrado';
    }
    else {
      this.ID = 'Inicie Sesion';
      this.router.navigate(['/singin']);
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log(this.toDate, '-', this.fromDate);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  obtenerIngresosyGastos() {
    if (this.toDate != null && this.fromDate != null) {
      let fechaFinal = this.toDate.year + '/' + this.toDate.month + '/' + this.toDate.day;
      let fechaInicial = this.fromDate.year + '/' + this.fromDate.month + '/' + this.fromDate.day;
      console.log(fechaInicial, '-', fechaFinal);
      this.obtenerGastos(fechaInicial, fechaFinal);
      this.obtenerIngresos(fechaInicial, fechaFinal);
    }
  }

  obtenerIngresos(_fechaInicial, _fechaFinal) {
    this.finazaServices.obtenerIngresos(_fechaInicial, _fechaFinal).subscribe(
      res => {
        this.listaIngresos = res;
        console.log(res);
      },
      err => console.error(err)
    )
  }

  obtenerGastos(_fechaInicial, _fechaFinal) {
    this.finazaServices.obtenerGastos(_fechaInicial, _fechaFinal).subscribe(
      res => {
        this.listaGastos = res;
        console.log(res);
      },
      err => console.error(err)
    )
  }

}
