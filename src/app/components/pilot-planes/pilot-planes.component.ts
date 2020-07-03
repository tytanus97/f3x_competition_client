import { Component, OnInit } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { Plane } from 'src/app/models/Plane';
import { switchMap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-pilot-planes',
  templateUrl: './pilot-planes.component.html',
  styleUrls: ['./pilot-planes.component.css']
})
export class PilotPlanesComponent implements OnInit {

  public currentPilot: Pilot;
  public pilotPlaneList: Array<Plane>;
  constructor(private pilotService: PilotService) { }

  ngOnInit(): void {
    this.pilotService.currentPilot.pipe(
    flatMap((pilot) => {
      return this.pilotService.getPilotPlanes(pilot.pilotId);
    }));
  }

}
