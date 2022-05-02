import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionModel } from '../models/seesion.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public usuario: string | undefined = '';
  public loginForm: FormGroup;
  public regExp = '^(?=.*?[A-Z])(?=.*?[0-9]).{1,}$';
  public msjError = 'Al menos una mayúscula y un número';
  public recordar: boolean;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private rr: Router) {
    this.loginForm = this.formBuilder.group({
      usuario: [this.getUsuario(), Validators.pattern(this.regExp)],
      clave: ['', Validators.pattern(this.regExp)],
    });
    this.recordar = this.getUsuario() ? true : false;
  }

  ngOnInit(): void {
  }

  getUsuario() {
    this.usuario = JSON.parse(JSON.stringify(localStorage.getItem('usuario')));
    return this.usuario;
  }

  submit() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
    } else {
      this.loading = true;
      this.loginService.postLogin().subscribe(
        {
          next: (data) => {
            console.log(data);
            localStorage.setItem('session', JSON.stringify(data));
            if (this.recordar) {
              localStorage.setItem('usuario', this.loginForm.controls['usuario'].value );
            }
            this.rr.navigate(['/home']);
          },
          error: (e) => console.error(e),
          complete: () => this.loading = false,
        }
      );
    }


  }

  validateUser() {
    return this.loginForm.controls['usuario'].invalid;
  }

  validateClave() {
    return this.loginForm.controls['clave'].invalid;
  }

}
