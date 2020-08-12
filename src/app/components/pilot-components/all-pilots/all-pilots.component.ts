import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-pilots',
  templateUrl: './all-pilots.component.html',
  styleUrls: ['./all-pilots.component.css']
})
export class AllPilotsComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public pilots: Array<Pilot>;

  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.pilotService.getAllPilots().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.pilots = data.sort((a, b) => a.pilotRating - b.pilotRating);

    });
  }

  showPilotDetails(pilotId) {
    this.pilotService.showPilotDetails(pilotId);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
