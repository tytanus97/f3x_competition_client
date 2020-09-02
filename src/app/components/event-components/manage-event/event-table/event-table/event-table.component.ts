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

}
