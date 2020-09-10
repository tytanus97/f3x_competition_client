import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';
import { Flight } from 'src/app/models/Flight';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {

  @Input()
  public pilotList: Array<Pilot>;

  @Input()
  public roundList: Array<Round>;

  public resultList: Array<Result>;

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  
    if(changes.pilotList.firstChange && changes.roundList.firstChange) {
    this.initResultList();
    }
    else {
      this.resultList.length = 0;
      this.initResultList();
    }
  }

  private initResultList(): void {
    const flightList = this.roundList.flatMap(r => r.flightList);
    this.resultList = this.pilotList.map(p => {
      const pFlights = flightList.filter( pf =>  pf.pilot.pilotId === p.pilotId);
      let ftotal = 0;
      for(let f of pFlights) {
        ftotal += f.total;
      }
      return {
        pilot:p,
        total:ftotal
      }
    });
  }
}

interface Result {
  pilot: Pilot;
  total: number;
}
