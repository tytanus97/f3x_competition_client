import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Pilot } from '../models/Pilot';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Plane } from '../models/Plane';
import { PilotCredentials } from '../models/PilotCredentials';

@Injectable({
  providedIn: 'root'
})
export class PilotService {

  public currentPilot = new BehaviorSubject<Pilot>(new Pilot());
  private _url = 'http://localhost:8080/api/pilots/';

  constructor(private http: HttpClient) {

  }

  addPilot(pilot: Pilot): Observable<HttpResponse<Pilot>>{
    return this.http.post(this._url, pilot, {observe: 'response'});
  }

  addPilotCredentials(pilotId: number, pilotCredentials: PilotCredentials): Observable<HttpResponse<Pilot>> {
    return this.http.post(this._url + `${pilotId}`, pilotCredentials, {observe: 'response'});
  }
  getAllPilots() {
    return this.http.get<Array<Pilot>>(this._url);
  }

  getByEmail(email: string): Observable<Pilot> {
    let param = new HttpParams();
    param = param.append('email', email);
    return this.http.get<Pilot>(this._url + 'email', {params: param});
  }

  getPilotById(pilotId: number) {
    return this.http.get<Pilot>(this._url + `${pilotId}`, {observe: 'response'});
  }

  getPilotPlanes(pilotId: number) {
    return this.http.get<Array<Plane>>(this._url + `${pilotId}/planes`);
  }

  getByUsername(usrnm: string): Observable<Pilot> {

    let param = new HttpParams();
    param = param.append('username',usrnm);
    return this.http.get<Pilot>(this._url + 'username', {params: param});
  }


  changeCurrentPilot(pilot: Pilot) {
    this.currentPilot.next(pilot);
  }

  addPlaneToPilot(pilotId: number, fd: FormData) {

const httpOptions = {
      headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
    options: {
      observe: 'response'
    }};
return this.http.post(this._url + `${pilotId}/planes`, fd , httpOptions);
  }

  deletePlane(planeId: number) {
    return this.http.delete(this._url + `planes/${planeId}`, {observe: 'response'});
  }

  deletePilot(pilotId: number) {
    return this.http.delete(this._url + `${pilotId}`, {observe: 'response'});
  }

}
