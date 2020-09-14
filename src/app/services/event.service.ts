import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Event } from 'src/app/models/Event';
import { Pilot } from '../models/Pilot';
import { Observable, BehaviorSubject } from 'rxjs';
import { Round } from '../models/Round';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _url = 'http://localhost:8080/api/events/';
  private _url_flights = 'http://localhost:8080/api/flights/'

  private currentEvent = new BehaviorSubject<Event>(null);
  private currentEventPilots = new BehaviorSubject<Array<Pilot>>(null);
  private currentEventRounds = new BehaviorSubject<Array<Round>>(null);

  constructor(private http: HttpClient) { }


  public addEvent(event: Event) {
    return this.http.post(this._url, event, {observe: 'response'});
  }

  public findById(eventId: number): Observable<HttpResponse<Event>> {
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

  public changeRegistrationStatus(eventId: number, registrationStatus: boolean): Observable<HttpResponse<Event>> {
    return this.http.patch<Event>(this._url + `${eventId}/registrationStatus`,
     registrationStatus, {observe: 'response'});
  }

  public findEventRounds(eventId: number ): Observable<HttpResponse<Array<Round>>> {
    return this.http.get<Array<Round>>(this._url + `${eventId}/rounds`, {observe: 'response'});
  }

  public addRound(round: Round, eventId: number): Observable<HttpResponse<Round>> {
    return this.http.post<Round>(this._url + `${eventId}/rounds`, round, {observe: 'response'});
  }

  public finalizeRound(round: Round) {
     return this.http.put(this._url + `rounds/${round.roundId}/finalizeRound`, round, {observe: 'response'});
  }

  public addFlight(flight: Flight, roundId: number) {
      return this.http.post(this._url + `rounds/${roundId}/flights`, flight, {observe: 'response'});
  }

  public deleteFlight(flightId: number) {
    return this.http.delete(this._url_flights + `${flightId}/delete`,{observe:'response'});
  }

  public finishEvent(eventId: number) {
    return this.http.put(this._url + `${eventId}/finishEvent`,{observe:'response'});
  }

  public initResultList(eventRounds,eventPilots) {
    if (eventRounds && eventRounds.length > 0) {
      const flightList: Array<Flight> = eventRounds.flatMap(r => r.flightList);
      if (!flightList || flightList.length <= 0) return;
      return eventPilots.map(p => {
        const pFlights = flightList.filter(pf => pf.pilot.pilotId === p.pilotId);
        if(pFlights && pFlights.length > 0) {
          
          let ftotal = 0;
          for (let f of pFlights) {
            ftotal += f.total;
          }
          console.log({
            pilot: p,
            total: ftotal,
            place: 0
          });
         return {
            pilot: p,
            total: ftotal,
            place: 0
          } 
        }
      });
   
    }
  }

  public setCurrentEvent(event: Event): void {
      this.currentEvent.next(event);
  }

  public setCurrentEventRounds(eventRounds: Array<Round>): void {
    this.currentEventRounds.next(eventRounds);
  }

  public setCurrentEventPilots(eventPilots: Array<Pilot>): void {
    this.currentEventPilots.next(eventPilots);
  }

  public getCurrentEvent() {
    return this.currentEvent;
  }
  public getCurrentEventRounds() {
    return this.currentEventRounds;
  }
  public getCurrentEventPilots() {
    return this.currentEventPilots;
  }
}

