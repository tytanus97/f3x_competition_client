import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { Plane } from 'src/app/models/Plane';
import { switchMap, flatMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pilot-planes',
  templateUrl: './pilot-planes.component.html',
  styleUrls: ['./pilot-planes.component.css']
})
export class PilotPlanesComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly onDestroy = new Subject<void>();
  public currentPilot: Pilot;
  public pilotPlaneList: Array<Plane>;
  public showPlaneForm = false;
  public viewByProfile: boolean;

  @ViewChild('planeAddBtn') planeAddBtn;


  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute,
              private location: Location, private authService: AuthService) { }


  ngOnInit(): void {
    this.pilotService.currentPilot.pipe(takeUntil(this.onDestroy), switchMap(pilot => {
      this.currentPilot = pilot;
      return this.pilotService.getPilotPlanes(pilot.pilotId);
    }))
    .subscribe(planes => this.pilotPlaneList = planes);
  }

  ngAfterViewInit(): void {
    this.planeAddBtn.nativeElement.innerText = 'Dodaj samolot';
    const currentPilotId = localStorage.getItem('currentPilot');
    if (currentPilotId !== null) {
      // tslint:disable-next-line: radix
      this.pilotService.changeCurrentPilot(parseInt(currentPilotId));
      const loggedPilotId = localStorage.getItem('loggedPilotId');
      this.viewByProfile = (loggedPilotId !== null && currentPilotId === loggedPilotId) ? true : false;
    }
  }


  navigate(target: string) {
  }
  navigateBack() {
    this.location.back();
  }
  setShowForm() {
    this.showPlaneForm = !this.showPlaneForm;
    this.planeAddBtn.nativeElement.innerText = this.showPlaneForm ? 'Anuluj dodawanie' : 'Dodaj samolot';
    this.planeAddBtn.nativeElement.className = this.showPlaneForm ? 'btn btn-warning' : 'btn btn-success';
  }

  addPlaneToLocalList(plane: Plane) {
    this.pilotPlaneList.push(plane);
    this.showPlaneForm = false;
    this.planeAddBtn.nativeElement.innerText = this.showPlaneForm ? 'Anuluj dodawanie' : 'Dodaj samolot';
    this.planeAddBtn.nativeElement.className = this.showPlaneForm ? 'btn btn-warning' : 'btn btn-success';
  }

  deletePlane(plane: Plane) {
    this.pilotService.deletePlane(plane.planeId).pipe(takeUntil(this.onDestroy)).subscribe(response => {
      if(response.status === 200) {
        this.pilotPlaneList.splice(this.pilotPlaneList.indexOf(plane), 1);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
