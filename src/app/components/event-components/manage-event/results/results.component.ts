import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';
import { Event } from 'src/app/models/Event';
import { Flight } from 'src/app/models/Flight';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {

  @Input()
  public eventPilots: Array<Pilot>;

  @Input('eventRounds')
  public eventRounds: Array<Round>;

  @Input()
  public currentEvent: Event;

  public resultList: Array<Result>;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.resultList = this.eventService.initResultList(this.eventRounds,this.eventPilots);
  
  }

}

interface Result {
  pilot: Pilot;
  total: number;
  place: number;
}
