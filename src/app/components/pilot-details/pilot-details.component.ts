import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pilot-details',
  templateUrl: './pilot-details.component.html',
  styleUrls: ['./pilot-details.component.css']
})
export class PilotDetailsComponent implements OnInit {

  public currentPilot;
  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let pilotId = this.route.snapshot.paramMap.get('id');
    this.pilotService.getPilotById(parseInt(pilotId)).subscribe(response => {
      this.currentPilot = response.body;
      console.log(this.currentPilot);
    });
   // this.pilotService.currentPilot.subscribe(pilot => this.currentPilot = pilot);
  }
}
