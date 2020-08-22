import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public currentEvent: Event;
  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService,
              private location: Location) { }

  ngOnInit(): void {

    const eventId = this.route.snapshot.queryParamMap.get('eventId');
    console.log(eventId);
    try {
      if (Number(eventId)) {
        this.eventService.findById(Number(eventId)).pipe(takeUntil(this.onDestroy)).subscribe(response => {
          this.currentEvent = response.body;
          console.log(this.currentEvent);
        });
      } else {
          throw Error('invalid parameter');
      }
    } catch (error) {
      console.log(error);
      this.router.navigate(['searchEvent'], { relativeTo: this.route.parent});
      return;
    }
  }

  navigateBack() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
