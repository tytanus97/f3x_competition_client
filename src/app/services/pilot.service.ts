import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pilot } from '../models/Pilot';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  private _url = 'http://localhost:8080/api/pilots/'
  constructor(private http: HttpClient) {
  }

  addPilot(pilot: Pilot){
    return this.http.post(this._url, pilot, {observe: 'response'});
  }

  getAllPilots() {
    return this.http.get<Array<Pilot>>(this._url);
  }

}
