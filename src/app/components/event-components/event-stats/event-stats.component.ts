import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-event-stats',
  templateUrl: './event-stats.component.html',
  styleUrls: ['./event-stats.component.css']
})
export class EventStatsComponent implements OnInit {

  private event: Event;
  private eventPilots: Array<Pilot>
  private eventRounds: Array<Round>;
  public resultList: Array<any>;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
 this.eventService.getCurrentEvent().pipe(mergeMap(data => {
      this.event = data;
      return this.eventService.getCurrentEventPilots();
    }),
    mergeMap(data => {
      this.eventPilots = data;
      return this.eventService.getCurrentEventRounds();
    })).subscribe(data => {
      this.eventRounds = data;

      this.resultList = this.eventService.initResultList(this.eventRounds,this.eventPilots);
    });

  }

}
