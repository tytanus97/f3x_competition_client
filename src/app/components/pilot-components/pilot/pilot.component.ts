import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pilot } from 'src/app/models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';


@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {

  constructor(private pilotService: PilotService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  navigateChild(target: string) {
    this.router.navigate([target]);
  }
}
