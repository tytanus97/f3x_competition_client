import { Round } from './../../../models/Round';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';
import { Location } from '@angular/common';
import { take } from 'rxjs/internal/operators/take';
import { switchMap } from 'rxjs/operators';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  public currentEvent: Event;
  public currentComponent = 'event-table';
  public eventRounds: Array<Round>;

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.route.data.pipe(switchMap(data => {
      this.currentEvent = data.currentEvent.body;
      return this.eventService.findEventRounds(this.currentEvent.eventId);
    })).subscribe(response => {
        if (response.status === 200) {
          this.eventRounds = response.body;
        } else {
          console.error('Error getting event rounds');
        }
    });
  }


  endRegistrationPhase() {
    this.eventService.changeRegistrationStatus(this.currentEvent.eventId, false).pipe(take(1)).subscribe(response => {
      console.log(response);
      if (response.status === 200) {
        this.currentEvent = response.body;
        window.location.reload();
      }
    });
  }

  openRegistrationPhase() {
    this.eventService.changeRegistrationStatus(this.currentEvent.eventId, true).pipe(take(1)).subscribe(response => {
      console.log(response.body);
      if (response.status === 200) {
        this.currentEvent = response.body;
        window.location.reload();
      }
    });
  }

  navigateBack() {
    this.location.back();
  }

}
