import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class PilotPlanesComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public currentPilot: Pilot;
  public pilotPlaneList: Array<Plane>;

  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const pilotId = this.route.snapshot.paramMap.get('pilotId');
    this.pilotService.getPilotById(parseInt(pilotId)).pipe(takeUntil(this.onDestroy)).subscribe(pilot => this.currentPilot = pilot.body);
    this.pilotService.currentPilot.pipe(takeUntil(this.onDestroy)).subscribe(pilot => this.currentPilot = pilot);
    this.pilotService.getPilotPlanes(parseInt(pilotId)).pipe(takeUntil(this.onDestroy)).subscribe(planes => this.pilotPlaneList = planes);
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
