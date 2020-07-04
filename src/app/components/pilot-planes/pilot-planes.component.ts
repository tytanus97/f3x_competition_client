import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { Plane } from 'src/app/models/Plane';
import { switchMap, flatMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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

  @ViewChild('planeAddBtn') planeAddBtn;


  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const pilotId = this.route.snapshot.paramMap.get('pilotId');
    this.pilotService.getPilotById(parseInt(pilotId)).pipe(takeUntil(this.onDestroy)).subscribe(pilot => this.currentPilot = pilot.body);
    this.pilotService.currentPilot.pipe(takeUntil(this.onDestroy)).subscribe(pilot => this.currentPilot = pilot);
    this.pilotService.getPilotPlanes(parseInt(pilotId)).pipe(takeUntil(this.onDestroy)).subscribe(planes => this.pilotPlaneList = planes);
  }

  ngAfterViewInit(): void {
    this.planeAddBtn.nativeElement.innerText = 'Pokaz formularz';
    console.log(this.planeAddBtn);
  }


  navigate(target: string) {
    this.router
  }

  setShowForm() {
    this.showPlaneForm = !this.showPlaneForm;
    this.planeAddBtn.nativeElement.innerText = this.showPlaneForm ? 'Anuluj dodawanie' : 'Pokaz formularz';
    this.planeAddBtn.nativeElement.className = this.showPlaneForm ? 'btn btn-warning' : 'btn btn-success';
    console.log('asdasd');
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
