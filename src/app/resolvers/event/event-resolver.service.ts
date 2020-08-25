import { EventService } from './../../services/event.service';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Event } from 'src/app/models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<HttpResponse<Event>> {

  constructor(private eventService: EventService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   HttpResponse<Event> | Observable<HttpResponse<Event>> | Promise<HttpResponse<Event>> {

    const eventId = route.queryParamMap.get('eventId');
    if (!Number(eventId)) {
      throw Error('Invalid eventId parameter');
    }
    console.log(eventId);
    return this.eventService.findById(Number(eventId));

  }





}
