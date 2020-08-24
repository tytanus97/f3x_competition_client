import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Pilot } from 'src/app/models/Pilot';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public currentEvent: Event;
  public currentEventPilotList: Array<Pilot>;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService,
              private location: Location, private authService: AuthService) { }

  ngOnInit(): void {

    const eventId = this.route.snapshot.queryParamMap.get('eventId');
    console.log(eventId);
    try {
      if (Number(eventId)) {
        this.eventService.findById(Number(eventId)).pipe(takeUntil(this.onDestroy), switchMap((response) => {
          this.currentEvent = response.body;
          return this.eventService.findEventPilots(this.currentEvent.eventId);
        })).subscribe(response => {
          console.log(response.body);
          this.currentEventPilotList = response.body;
        });
      } else {
        throw Error('invalid parameter');
      }
    } catch (error) {
      console.log(error);
      this.router.navigate(['searchEvent'], { relativeTo: this.route.parent });
      return;
    }
  }

  registerMe() {
    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return;
    }
    this.eventService.addPilotToEvent(this.currentEvent.eventId, this.authService.getLoggedPilotId()).subscribe(response => {
      switch (response.status) {
        case 400: {
          console.error('Nieprawidłowe żądanie');
        } break;
        case 208: {
          console.error('Pilot juz zarejestrowany');
        } break;
        case 200: {
          this.router.navigate([this.location.path()]);
        }
      }
    });
  }

  isLoggedPilotInList(): boolean {
    const loggedPilotId = this.authService.getLoggedPilotId();
    return this.currentEventPilotList && this.currentEventPilotList
          .filter(pilot => pilot.pilotId === loggedPilotId).length > 0 ? true : false;
  }

  navigateBack() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
