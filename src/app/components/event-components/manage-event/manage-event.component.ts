import { Round } from './../../../models/Round';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';
import { Location } from '@angular/common';
import { take } from 'rxjs/internal/operators/take';
import { switchMap, concat, concatMap } from 'rxjs/operators';
import { Pilot } from 'src/app/models/Pilot';

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
    } )).subscribe(response => {
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

  addRound() {
    if (confirm('Czy napewno chcesz dodać runde?')){
    const roundNum = typeof(this.eventRounds) === 'undefined' ? 1 : this.eventRounds.length + 1;
    const round: Round = new Round(0, roundNum, true, null);
    this.eventService.addRound(round, this.currentEvent.eventId).pipe(take(1)).subscribe(response => {
      if (response.status === 200) {
          window.location.reload();
      } else {
        console.error('something went wrong adding round to event');
      }
    });
  }
  }

  showTable() {
    this.currentComponent = 'event-table';
  }


  navigateBack() {
    this.location.back();
  }

}
