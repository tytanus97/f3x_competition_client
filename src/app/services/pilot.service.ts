import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Pilot } from '../models/Pilot';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { switchMap, takeUntil, debounceTime, map, first, catchError } from 'rxjs/operators';
import { Plane } from '../models/Plane';
import { PilotCredentials } from '../models/PilotCredentials';

@Injectable({
  providedIn: 'root'
})
export class PilotService implements OnDestroy {
  [x: string]: any;
  private ngDestroy = new Subject<void>();
  private _url = 'http://localhost:8080/api/pilots/';
  public currentPilot = new BehaviorSubject<Pilot>(new Pilot());

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {

  }


  addPilot(pilot: Pilot): Observable<HttpResponse<Pilot>> {
    return this.http.post(this._url, pilot, { observe: 'response' });
  }

  addPilotCredentials(pilotId: number, pilotCredentials: PilotCredentials): Observable<HttpResponse<Pilot>> {
    return this.http.post(this._url + `${pilotId}`, pilotCredentials, { observe: 'response' });
  }
  getAllPilots() {
    return this.http.get<Array<Pilot>>(this._url);
  }

  findAllPilotsByCountryName(countryName: string) {

    let params = new HttpParams();
    params = params.append('countryName',countryName);
    return this.http.get<Array<Pilot>>(this._url + 'country',{params:params});
  }

  getByEmail(email: string): Observable<Pilot> {
    let param = new HttpParams();
    param = param.append('email', email);
    return this.http.get<Pilot>(this._url + 'email', { params: param });
  }

  getPilotById(pilotId: number) {
    console.log(typeof pilotId);
    return this.http.get<Pilot>(this._url + `${pilotId}`, { observe: 'response' });
  }

  getPilotPlanes(pilotId: number) {
    if (pilotId !== undefined) {
      return this.http.get<Array<Plane>>(this._url + `${pilotId}/planes`);
    }
    return of(Array.of<Plane>());
  }

  getByUsername(usrnm: string): Observable<Pilot> {

    let param = new HttpParams();
    param = param.append('username', usrnm);
    return this.http.get<Pilot>(this._url + 'username', { params: param });
  }

  usernameExist(usrnm: string, pId: number) {
    return this.getByUsername(usrnm).pipe(debounceTime(1000), map(pilot => {
      return (pilot && (pilot as Pilot).pilotId !== pId) ? of(true) : of(false);
    }), catchError(_ => of(false)), first());
  }

  emailExist(email: string, pId: number) {
    return this.getByEmail(email).pipe(debounceTime(1000), map((pilot) => {
      return (pilot && (pilot as Pilot).pilotId !== pId) ? of(true) : of(false);
    }), catchError(_ => of(false)), first());
  }

  changeCurrentPilot(pilotId: number) {
    if (pilotId === 0) {
      this.currentPilot.next(new Pilot());
    } else {
      this.getPilotById(pilotId).pipe(takeUntil(this.ngDestroy)).subscribe(response => this.currentPilot.next(response.body));
      localStorage.setItem('currentPilot', pilotId.toString());
    }
  }

  addPlaneToPilot(pilotId: number, fd: FormData) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      options: {
        observe: 'response'
      }
    };
    return this.http.post(this._url + `${pilotId}/planes`, fd, httpOptions);
  }

  deletePlane(planeId: number) {
    return this.http.delete(this._url + `planes/${planeId}`, { observe: 'response' });
  }

  deletePilot(pilotId: number) {
    return this.http.delete(this._url + `${pilotId}`, { observe: 'response' });
  }

  showPilotProfile() {
    if (localStorage.getItem('token') && localStorage.getItem('loggedPilotId')) {
      // tslint:disable-next-line: radix
      this.changeCurrentPilot(parseInt(localStorage.getItem('loggedPilotId')));
      this.router.navigate(['/pilots/pilotProfile']);
    }
  }

  showPilotDetails(pilotId: number) {
    this.changeCurrentPilot(pilotId);
    this.router.navigate(['/pilots/pilotDetails']);
  }

  showPilotRegister() {
    this.changeCurrentPilot(0);
    this.router.navigate(['/register']);
  }

  showPilotLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.ngDestroy.next();
  }

}
