import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Event } from 'src/app/models/Event';
import { Pilot } from '../models/Pilot';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _url = 'http://localhost:8080/api/events/';

  constructor(private http: HttpClient) { }


  public addEvent(event: Event) {
    return this.http.post(this._url, event, {observe: 'response'});
  }

  public findById(eventId: number) {
    return this.http.get<Event>(this._url + `${eventId}`, {observe: 'response'});
  }

  public findEventPilots(eventId: number) {
    return this.http.get<Array<Pilot>>(this._url + `${eventId}/pilots`, {observe: 'response'});
  }

  public addPilotToEvent(eventId: number, pilotId: number): Observable<HttpResponse<Event>> {

    return this.http.post<HttpResponse<Event>>(this._url + `${eventId}/pilots/${pilotId}`, {observe: 'response'});
  }
  public getAllEvents() {
    return this.http.get<Array<Event>>(this._url, {observe: 'response'});
   }

   public updateEvent(event: Event) {
     return this.http.put(this._url + `/`, event, {observe: 'response'});
   }

}
