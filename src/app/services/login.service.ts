import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl
  }

  postLogin() {
    return this.http.post(this.url + '/login', {});
  }

  get isLoggedIn(): boolean {
    const auth = localStorage.getItem('session');
    return (auth !== null) ? true : false;
  }

  get session(): string | null {
    return localStorage.getItem('session') ? localStorage.getItem('session') : '';
  }


}
