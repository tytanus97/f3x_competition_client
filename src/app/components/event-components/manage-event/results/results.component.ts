import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';
import { Event } from 'src/app/models/Event';
import { Flight } from 'src/app/models/Flight';

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

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.initResultList();
  
  }

  private initResultList(): void {
    if (this.eventRounds && this.eventRounds.length > 0) {
      const flightList: Array<Flight> = this.eventRounds.flatMap(r => r.flightList);
      if (!flightList || flightList.length <= 0) return;
      this.resultList = this.eventPilots.map(p => {
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
      console.log(this.resultList);
    
    }
  }

}

interface Result {
  pilot: Pilot;
  total: number;
  place: number;
}
