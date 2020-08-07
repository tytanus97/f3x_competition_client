import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';
import { Pilot } from 'src/app/models/Pilot';

@Component({
  selector: 'app-pilot-profile',
  templateUrl: './pilot-profile.component.html',
  styleUrls: ['./pilot-profile.component.css']
})
export class PilotProfileComponent implements OnInit {

  constructor(private pilotService: PilotService, private authService: AuthService) { }
  private loggedPilot: Pilot;


  ngOnInit(): void {

    this.authService.loggedPilot.subscribe()
  }

}
