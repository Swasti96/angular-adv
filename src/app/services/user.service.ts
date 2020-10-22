import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


import { LoginForm } from '../interfaces/loginForm.interfaces';
import { RegisterForm } from '../interfaces/registerForm.interfaces';
import { User } from '../models/user.models';


const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})


export class UserService {

  public auth2: any;
  public user: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  googleInit = function () {
    return new Promise((resolve) => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '502930805973-jbb998n8mdihiq7t3lo85rohlkridkai.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });

    });
  };

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        // console.log(resp);

        const { name, email, password, img = '', rol, google, _id } = resp.user;

        this.user = new User(name, email, '', img, rol, google, _id);
        this.user.printUser();

        localStorage.setItem('token', resp.token)

        return true
      }),
      catchError(error => of(false))
    )
  }


  createUser(formData: RegisterForm) {

    return this.http.post(`${base_url}/users/add-user`, formData) //Retorna un observable
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }


  updateUser(data: { name: string, email: string, role:string }) {

    data = {
      ...data,
      role: this.user.rol
    }

    return this.http.put(`${base_url}/users/update-user/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData) //Retorna un observable
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }

  loginGoogle(token) {

    return this.http.post(`${base_url}/login/google`, { token }) //Retorna un observable
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }
}

