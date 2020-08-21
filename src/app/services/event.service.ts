import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _url = 'http://localhost:8080/api/events/';

  constructor(private http: HttpClient) { }


  public addEvent(event: Event) {
    return this.http.post(this._url, event, {observe: 'response'});
  }

  public getEvent(eventId: number) {
    return this.http.get<Event>(this._url + `${eventId}`, {observe: 'response'});
  }

  public getAllEvents() {
    return this.http.get<Array<Event>>(this._url, {observe: 'response'});
   }

   public updateEvent(event: Event) {
     return this.http.put(this._url + `/`, event, {observe: 'response'});
   }

}
