import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, merge, mergeMap } from 'rxjs/operators';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-event-rounds',
  templateUrl: './event-rounds.component.html',
  styleUrls: ['./event-rounds.component.css']
})
export class EventRoundsComponent implements OnInit {

  constructor(private eventService: EventService,private route: ActivatedRoute) { }

  public eventRounds: Array<Round>;
  public eventPilots: Array<Pilot>;
  public event: Event;


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
    });
   
  }

  toggleTable(event) {
    const id: string = event.target.id;
    const num = id.substring(1);
    event.target.style.display = 'none';
    const clickedEl = id.substring(0, 1);

    document.getElementById(`${clickedEl === 's' ? 'h' : 's'}${num}`).style.display = 'initial';
    document.getElementById(`t${num}`).style.display = (clickedEl === 's' ? 'table' : 'none');
  }

  enter(event) {
    event.target.style.color = 'white';
    event.target.style.cursor = 'pointer';
  }

  leave(event) {
    event.target.style.color = 'black';
  }

}
