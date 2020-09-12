import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';
import { Flight } from 'src/app/models/Flight';
import { catchError, switchMap, take } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
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

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.pilotList.firstChange && changes.roundList.firstChange) {
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
  }

  addRound() {
    if (confirm('Czy napewno chcesz dodać runde?')) {
      const roundNum = typeof (this.eventRounds) === 'undefined' ? 1 : this.eventRounds.length + 1;
      const round: Round = new Round(0, roundNum, true, null);

      if (roundNum >= 2) {
        this.eventService.finalizeRound(this.eventRounds[Number(roundNum) - 2]).pipe(switchMap((response) => {
          if (response.status !== 200) {
            throw Error('Something went wrong when finalize round');
          }
          return this.eventService.addRound(round, this.currentEvent.eventId);
        }), take(1),
          catchError((err) => { throw Error(err); })
        ).subscribe(response => {
          if (response.status === 200) {
            window.location.reload();
          } else {
            throw Error('something went wrong adding round to event');
          }
        }, err => console.log(err));
      } else {
        this.eventService.addRound(round, this.currentEvent.eventId).pipe(take(1)).subscribe(response => {
          if (response.status === 200) {
            window.location.reload();
          } else {
            console.error('something went wrong adding round to event');
          }
        });
      }

    }
  }

}

interface Result {
  pilot: Pilot;
  total: number;
  place: number;
}
