import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Round } from 'src/app/models/Round';
import { Pilot } from 'src/app/models/Pilot';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EventService } from 'src/app/services/event.service';
import { take } from 'rxjs/operators';
import { PilotHomeComponent } from 'src/app/components/pilot-components/pilot-home/pilot-home.component';
import { ConfigurableFocusTrapConfig } from '@angular/cdk/a11y/focus-trap/configurable-focus-trap-config';


@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit{

  @Input()
  public roundList: Array<Round>;
  @Input()
  public pilotList: Array<Pilot>;
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

}
