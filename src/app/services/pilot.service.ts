import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Pilot } from '../models/Pilot';
import { Observable, BehaviorSubject } from 'rxjs';
import { Plane } from '../models/Plane';

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

  getAllByEmail(email: string) {
    let param = new HttpParams();
    param = param.append('email', email);
    return this.http.get<Array<Pilot>>(this._url + 'email', {params: param});
  }

  getPilotById(pilotId: number) {
    return this.http.get<Pilot>(this._url + `${pilotId}`, {observe: 'response'});
  }

  getPilotPlanes(pilotId: number) {
    return this.http.get<Array<Plane>>(this._url + `${pilotId}/planes`);
  }

  changeCurrentPilot(pilot: Pilot) {
    this.currentPilot.next(pilot);
  }

  addPlaneToPilot(pilotId: number, plane: Plane) {
    return this.http.post(this._url + `${pilotId}/planes`, plane, {observe: 'response'});
  }

  deletePlane(planeId: number) {
    return this.http.delete(this._url + `planes/${planeId}`, {observe: 'response'});
  }

  deletePilot(pilotId: number) {
    return this.http.delete(this._url + `${pilotId}`, {observe: 'response'});
  }

}
