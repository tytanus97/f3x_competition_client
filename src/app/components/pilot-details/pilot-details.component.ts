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
    const pilotId = this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line: radix
    this.pilotService.changeCurrentPilot(parseInt(pilotId));
    this.pilotService.currentPilot.pipe(takeUntil(this.onDestroy)).subscribe(pilot => this.currentPilot = pilot);

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

    this.router.navigate([`../${target}`, {pilotId: this.currentPilot.pilotId}], {relativeTo: this.route});

  }
  updatePilot() {
    this.pilotService.changeCurrentPilot(this.currentPilot);
    this.router.navigate(['../pilotForm']);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
