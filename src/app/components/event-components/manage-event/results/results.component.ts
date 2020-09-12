import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';
import { Event } from 'src/app/models/Event';

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

    if (changes.eventPilots.firstChange && changes.eventRounds.firstChange) {
      this.initResultList();
    }
    else {
      this.resultList.length = 0;
      this.initResultList();
    }
  }

  private initResultList(): void {
    if (this.eventRounds && this.eventRounds.length > 0) {
      this.resultList = new Array<Result>();
      const flightList = this.eventRounds.flatMap(r => r.flightList);

      if (!flightList || flightList.length <= 0) return;

      this.eventPilots.forEach(p => {
        const pFlights = flightList.filter(pf => pf.pilot.pilotId === p.pilotId);
        if(pFlights && pFlights.length > 0) {

          let ftotal = 0;
          for (let f of pFlights) {
            ftotal += f.total;
          }
          this.resultList.push({
            pilot: p,
            total: ftotal,
            place: 0
          });
        }
      });
    }
    console.log(this.resultList);
  }

}

interface Result {
  pilot: Pilot;
  total: number;
  place: number;
}
