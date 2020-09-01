import { Component, OnInit, Input } from '@angular/core';
import { Round } from 'src/app/models/Round';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit {

  @Input()
  public roundList: Array<Round>;

  constructor() { }

  ngOnInit(): void {

    console.log(this.roundList);
  }

}
