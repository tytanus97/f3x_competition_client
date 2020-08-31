import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';
import {Location} from '@angular/common';
@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  public currentEvent: Event;
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentEvent = data.currentEvent.body;
    });
  }


  endRegistrationPhase() {

  }

  navigateBack() {
    this.location.back();
  }

}
