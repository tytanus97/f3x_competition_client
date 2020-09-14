import { Component, OnInit } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-pilots',
  templateUrl: './event-pilots.component.html',
  styleUrls: ['./event-pilots.component.css']
})
export class EventPilotsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  public eventPilots: Array<Pilot>;

  ngOnInit(): void {
    this.eventService.getCurrentEventPilots().subscribe(data => {
      this.eventPilots = data;
    });
  }


  
}
