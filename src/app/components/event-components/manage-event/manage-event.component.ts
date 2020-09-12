import { Round } from './../../../models/Round';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';
import { Location } from '@angular/common';
import { take } from 'rxjs/internal/operators/take';
import { switchMap, concat, concatMap, catchError } from 'rxjs/operators';
import { Pilot } from 'src/app/models/Pilot';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  public currentEvent: Event;
  public currentComponent = 'event-table';
  public eventRounds: Array<Round>;
  public eventPilots: Array<Pilot>;


  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.route.data.pipe(switchMap(data => {
      this.currentEvent = data.currentEvent.body;
      return this.eventService.findEventRounds(this.currentEvent.eventId);
    }), concatMap(response => {
      if (response.status === 200) {
        this.eventRounds = response.body;
      } else {
        throw Error('Error');
      }
      return this.eventService.findEventPilots(this.currentEvent.eventId);
    })).subscribe(response => {
      if (response.status === 200) {
        this.eventPilots = response.body;
      } else {
        throw Error('Error');
      }
      console.log(this.eventRounds);
      console.log(this.eventPilots);
    });
  }


  endRegistrationPhase() {
    this.eventService.changeRegistrationStatus(this.currentEvent.eventId, false).pipe(take(1)).subscribe(response => {
      if (response.status === 200) {
        this.currentEvent = response.body;
        window.location.reload();
      }
    });
  }

  openRegistrationPhase() {
    this.eventService.changeRegistrationStatus(this.currentEvent.eventId, true).pipe(take(1)).subscribe(response => {
      if (response.status === 200) {
        this.currentEvent = response.body;
        window.location.reload();
      }
    });
  }


  showResults() {
    this.currentComponent = 'app-results';
  }

  showRounds() {
    this.currentComponent = 'event-table';
  }
  

  finishEvent() {
      if(confirm('Do you want to finish this event?')) {
        if(this.eventRounds && this.eventRounds.length > 0) {
          this.eventService.finishEvent(this.currentEvent.eventId).pipe(take(1)).subscribe((response: HttpResponse<any>) => {
            if(response.status === 200) {
              window.location.reload();
            } else throw Error('Something went wrong when finish event');
          }, err => console.log(err));
        }
      }
  }



  navigateBack() {
    this.location.back();
  }

}
