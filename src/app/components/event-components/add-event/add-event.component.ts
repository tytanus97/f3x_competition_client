import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Location} from '@angular/common';
import {Location as Locat} from 'src/app/models/Location';

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
  constructor(private router: Router, private route: ActivatedRoute,
              private locationService: LocationService, private location: Location,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.locationService.findAllLocations().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.locationList = data;
    });

    this.eventForm = this.fb.group({
      eventName: [null],
      eventLocationName:[null]
    });
  }

  openDropDown() {
    this.showDropDown = true;
  }

  closeDropDown() {
    this.showDropDown = false;
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
