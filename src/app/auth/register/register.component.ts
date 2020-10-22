import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})

// TODO: El signup no esta capturando el error al no aceptar los terminos, incluso crea el user
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [true, Validators.required]
  }, {
    validators: this.matchPasswords('password', 'password2')
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

  }

  createUser() {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    //CreateUser retorna un observable
    this.userService.createUser(this.registerForm.value)
      .subscribe((resp) => {
        this.router.navigateByUrl('/login')

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

  }

  fieldNotValid(field: string): boolean {

    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsNotMatch() {

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  matchPasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {

      const pass1Controls = formGroup.get(pass1);
      const pass2Controls = formGroup.get(pass2);

      if (pass1Controls.value === pass2Controls.value) {
        pass2Controls.setErrors(null);
      } else {
        pass2Controls.setErrors({ noMatch: true })
      }

    }
  }
}
