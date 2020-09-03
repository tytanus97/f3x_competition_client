import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Round } from 'src/app/models/Round';
import { Pilot } from 'src/app/models/Pilot';

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

  constructor() { }

  ngOnInit(): void {
  }



  manageRound(round: Round) {

  }

  enter(event) {
    event.target.style.color = 'white';
    event.target.style.cursor = 'pointer';
  }

  leave(event) {
    event.target.style.color = 'black';
  }

  toggleTable(event) {
    const id: string = event.target.id;
    const num = id.substring(1);
    event.target.style.display = 'none';
    const clickedEl = id.substring(0, 1);

    document.getElementById(`${clickedEl === 's' ? 'h' : 's'}${num}`).style.display = 'initial';
    document.getElementById(`t${num}`).style.display = (clickedEl === 's' ? 'table' : 'none');
  }

}
