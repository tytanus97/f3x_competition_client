import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Location as Locat } from 'src/app/models/Location';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
import { validateDates } from 'src/app/shared/CustomValidators';
import { EventService } from 'src/app/services/event.service';
import { PilotService } from 'src/app/services/pilot.service';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {

  private onDestroy = new Subject<void>();

  public locationList: Array<Locat>;
  public showDropDown = false;
  public eventForm;

  public selectedLocation: Locat;

  constructor(private router: Router, private route: ActivatedRoute,
              private locationService: LocationService, private location: Location,
              private fb: FormBuilder, private pilotService: PilotService, private eventService: EventService) { }

  ngOnInit(): void {
    this.locationService.findAllLocations().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.locationList = data;
    });

    this.eventForm = this.fb.group({
      eventName: [null, { validators: [Validators.required] }],
      eventLocationName: [null, { validators: [Validators.required] }],
      startDate: [null, { validators: [Validators.required] }],
      endDate: [null, { validators: [Validators.required] }],
      roundCount: [null, { validators: [Validators.max(20), Validators.min(1), Validators.required] }]
    }, { validators: [validateDates('startDate', 'endDate')] });
  }

  addEvent() {
    if (this.eventForm.valid && !this.eventForm.pending) {
      const pilotDirectorId = Number(localStorage.getItem('loggedPilotId'));
      let event: Event;
      this.pilotService.getPilotById(pilotDirectorId).pipe(switchMap((response) => {
        if (response.status !== 200) {
           throw Error('Something went wrong');
        }
        event = new Event(0, this.eventForm.get('roundCount').value, this.eventForm.get('eventName').value,
        this.selectedLocation, this.eventForm.get('startDate').value, this.eventForm.get('endDate').value, response.body);
        console.log(event);

        
        return this.eventService.addEvent(event);
      })).subscribe(response => {
        console.log(response);
        console.log(response.body);
      }, error => console.log(error));
    }
  }

  openDropDown() {
    this.showDropDown = true;
  }

  closeDropDown() {
    this.showDropDown = false;
  }

  selectLocation(location: Locat) {
    this.selectedLocation = location;
    console.log(location);
    this.eventForm.patchValue({
      eventLocationName: location.locationName
    });
    this.closeDropDown();
  }

  showDatepicker(el: MatDatepicker<any>) {
    el.open();
  }

  getSearchLocationName() {
    return this.eventForm.get('eventLocationName').value;
  }

  get eventNameControl() {
    return this.eventForm.get('eventName')
  }

  get eventLocationNameControl() {
    return this.eventForm.get('eventLocationName');
  }


  ngOnDestroy() {
    this.onDestroy.next();
  }



}
