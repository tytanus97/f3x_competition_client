import { PilotCredentials } from 'src/app/models/PilotCredentials';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _url = 'http://localhost:8080/api/auth/';
  constructor(private httpClient: HttpClient,private router: Router) { }

  isLogged(): boolean {
    return !!(localStorage.getItem('token') !== null && localStorage.getItem('token') !== '');
  }

  authenticate(credentials: PilotCredentials) {
      // tslint:disable-next-line: max-line-length
      console.log(credentials);
      this.httpClient.post(this._url + 'authenticate', credentials).subscribe(res => this.setToken(res), err => {});

  }

  getToken(): string {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  setToken(response) {
    console.log(response.jwt);
    const token = response.jwt;

    console.log(token)
    localStorage.setItem('token', token);
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
