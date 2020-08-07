import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pilot } from 'src/app/models/Pilot';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pilot-details',
  templateUrl: './pilot-details.component.html',
  styleUrls: ['./pilot-details.component.css']
})
export class PilotDetailsComponent implements OnInit, OnDestroy{
  
  private readonly onDestroy = new Subject<void>();
  public currentPilot;
  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    let pilotId = this.route.snapshot.paramMap.get('id');
    this.pilotService.getPilotById(parseInt(pilotId)).pipe(takeUntil(this.onDestroy)).subscribe(response => {
      this.currentPilot = response.body;
      this.pilotService.changeCurrentPilot(this.currentPilot);
      console.log(this.currentPilot);
    });
   // this.pilotService.currentPilot.subscribe(pilot => this.currentPilot = pilot);
  }



  deletePilot(pilotId: number) {
    if (confirm('Usunąć pilota?')) {
      this.pilotService.deletePilot(pilotId).pipe(takeUntil(this.onDestroy)).subscribe(response => {
        console.log(response);
        if (response.status ===  200) {
          this.router.navigate(['../allPilots'], {relativeTo: this.route});
        }
      });

    }
  }

  navigate(target: string) {
    this.router.navigate([`../${target}`], {relativeTo: this.route});
  }

  navigateToPilotPlanes(target: string) {

    this.router.navigate(['../' + target, {pilotId: this.currentPilot.pilotId}], {relativeTo: this.route});

  }
  updatePilot() {
    this.pilotService.changeCurrentPilot(this.currentPilot);
    this.router.navigate(['../pilotForm']);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
