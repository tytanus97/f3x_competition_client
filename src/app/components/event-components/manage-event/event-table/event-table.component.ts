import { Component, OnInit, Input } from '@angular/core';
import { Round } from 'src/app/models/Round';
import { Pilot } from 'src/app/models/Pilot';
import { EventService } from 'src/app/services/event.service';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit{

  @Input()
  public eventRounds: Array<Round>;
  @Input()
  public eventPilots: Array<Pilot>;

  @Input()
  public currentEvent: Event;

  public showFlightForm = false;
  private currentRoundId;

  public styleShow = '{font-size:2rem;display:initial}';
  public styleHide = '{font-size:2rem;display:none}';


  constructor(private eventService: EventService) { }

  ngOnInit(): void {

  }



  enter(event) {
    event.target.style.color = 'white';
    event.target.style.cursor = 'pointer';
  }

  leave(event) {
    event.target.style.color = 'black';
  }

  showForm(roundId: number) {
    this.showFlightForm = true;
    this.currentRoundId = roundId;
  }

  cancelForm() {
    this.showFlightForm = false;
    this.currentRoundId = null;
  }

  flightSubmited(value) {

       if (this.currentRoundId) {
         console.log('dupa3');
         this.eventService.addFlight(value, this.currentRoundId).pipe(take(1)).subscribe(response => {
          if (response.status === 201) {
            window.location.reload();
          } else {
            throw Error('Error adding new flight');
          }
        },
        err => console.log(err));
      
  }
}

  toggleTable(event) {
    const id: string = event.target.id;
    const num = id.substring(1);
    event.target.style.display = 'none';
    const clickedEl = id.substring(0, 1);

    document.getElementById(`${clickedEl === 's' ? 'h' : 's'}${num}`).style.display = 'initial';
    document.getElementById(`t${num}`).style.display = (clickedEl === 's' ? 'table' : 'none');
  }

  deleteFlight(flightId: number,round: Round) {
    this.eventService.deleteFlight(flightId).pipe(take(1)).subscribe(response => {
      if(response.status === 200) {
          round.flightList = round.flightList.filter(f => f.flightId !== flightId);
      } else {
        throw Error('Something went wrong deleting flight');
      }
    },err => console.log(err));
  }

  finalizeRound(round: Round) {
    if(confirm('Do you want to finalize this round?')) {
    this.eventService.finalizeRound(round).pipe(take(1)).subscribe(response => {
      if(response.status === 200) {
        window.location.reload();
      } else {
        throw Error('Something went wrong when finalize round');
      }
    },err => console.log(err));
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
