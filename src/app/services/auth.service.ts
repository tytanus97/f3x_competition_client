
import { PilotService } from './pilot.service';
import { PilotCredentials } from 'src/app/models/PilotCredentials';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pilot } from '../models/Pilot';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:8080/api/auth/';
  public loggedPilot = new BehaviorSubject<Pilot>(null);

  constructor(private httpClient: HttpClient, private router: Router, private pilotService: PilotService) { }

  isLogged(): boolean {
    return !!(localStorage.getItem('token') !== null && localStorage.getItem('token') !== '');
  }

  authenticate(credentials: PilotCredentials) {
    return this.httpClient.post(this._url + 'authenticate', credentials);
  }

  getToken(): string {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  getLoggedPilotId(): number {
    const loggedPilotId = localStorage.getItem('loggedPilotId');
    if (Number(loggedPilotId)) {
      return Number(loggedPilotId);
        }
  }

  setToken(response) {
    const token = response.jwt;
    const loggedPilotId = response.pilotId;
    localStorage.setItem('token', token);
    localStorage.setItem('loggedPilotId', loggedPilotId);

    this.pilotService.getPilotById(loggedPilotId).subscribe(response => this.loggedPilot.next(response.body));

    this.router.navigate(['/home']);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedPilotId');
    this.loggedPilot.next(null);
    this.router.navigate(['/home']);
  }
}
