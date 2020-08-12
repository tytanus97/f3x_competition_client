
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pilot } from 'src/app/models/Pilot';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pilot-profile',
  templateUrl: './pilot-profile.component.html',
  styleUrls: ['./pilot-profile.component.css']
})
export class PilotProfileComponent implements  OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();
  public currentPilot;
  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute,
              private location: Location) { }


  ngOnInit(): void {
    console.log('init w details');
    if(localStorage.getItem('currentPilot') !== null) {
      // tslint:disable-next-line: radix
      this.pilotService.changeCurrentPilot(parseInt(localStorage.getItem('currentPilot')));
    }
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

    this.router.navigate([`../${target}`], {relativeTo: this.route});

  }
  navigateBack() {
    this.location.back();
  }
  updatePilot() {
    this.router.navigate(['../pilotForm']);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}

