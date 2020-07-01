import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pilot } from '../models/Pilot';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PilotService {

  public currentPilot = new BehaviorSubject<Pilot>(new Pilot());
  private _url = 'http://localhost:8080/api/pilots/';

  constructor(private http: HttpClient) {
  }

  addPilot(pilot: Pilot){
    return this.http.post(this._url, pilot, {observe: 'response'});
  }
  getAllPilots() {
    return this.http.get<Array<Pilot>>(this._url);
  }

  getPilotById(pilotId: number) {
    return this.http.get<Pilot>(this._url + `${pilotId}`, {observe: 'response'});
  }

  changeCurrentPilot(pilot: Pilot) {
    this.currentPilot.next(pilot);
  }

}
