import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  user: FormGroup

  constructor() {

  }

  ngOnInit(): void {
    this.user = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmpass: new FormControl('', Validators.required)
      },
      {
        validators: this.passwordMatchValidator
      }
    );

  }

  onSubmit() {

  }

  // Funcion de confirmacion de usuarios
  passwordMatchValidator(g: FormGroup): { invalid: boolean } {
    return g.get('password').value === g.get('confirmpass').value ? null : { invalid: true };
  }


}
