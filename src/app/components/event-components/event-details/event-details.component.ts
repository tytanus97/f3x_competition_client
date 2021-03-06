import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Pilot } from 'src/app/models/Pilot';
import { Round } from 'src/app/models/Round';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public currentEvent: Event;
  public eventRounds: Array<Round>;
  public currentEventPilotList: Array<Pilot>;
  public isLoggedUserInEventPilotsList: boolean;
  public showManageBtn: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService,
              private location: Location, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.pipe(switchMap(data => {
      this.currentEvent = data.currentEvent.body;
      this.showManageBtn = this.authService.getLoggedPilotId() &&
      (this.authService.getLoggedPilotId() === this.currentEvent.pilotDirector.pilotId);
      return this.eventService.findEventPilots(this.currentEvent.eventId);
    }),
    switchMap(response => {
      if (response.status === 200) {
        this.currentEventPilotList = response.body;
        this.isLoggedUserInEventPilotsList = this.isLoggedPilotInList();
      } else {
        this.router.navigate(['searchEvent'], { relativeTo: this.route.parent });
        throw Error('Something went wrong getting event pilots');
      }
      return this.eventService.findEventRounds(this.currentEvent.eventId);
    })).subscribe(response => {
      if (response.status === 200) {
        this.eventRounds = response.body;

        this.eventService.setCurrentEvent(this.currentEvent);
        this.eventService.setCurrentEventPilots(this.currentEventPilotList);
        this.eventService.setCurrentEventRounds(this.eventRounds);
      } else {
        throw Error('Something went wrong getting event rounds');
      }
    },
    err => console.log(err));
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
        default: {
         console.log('reload');
         window.location.reload();
        }
      }
    });
  }

  isLoggedPilotInList(): boolean {
    const loggedPilotId = this.authService.getLoggedPilotId();
    return this.currentEventPilotList && this.currentEventPilotList
      .filter(pilot => pilot.pilotId === loggedPilotId).length > 0 ? true : false;
  }

  navigateEventManage() {
    this.router.navigate(['manageEvent'], {queryParams: {eventId: this.currentEvent.eventId},
                                          relativeTo: this.route.parent});
  }

  navigateBack() {
    this.router.navigate(['/events/home']);
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
