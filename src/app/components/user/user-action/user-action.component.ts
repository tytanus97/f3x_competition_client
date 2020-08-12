import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {

  constructor(private pilotService: PilotService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  isLogged() {
    return this.authService.isLogged();
  }

  register() {
    this.pilotService.showPilotRegister();
  }
  login() {
    this.pilotService.showPilotLogin();
  }
  logout() {
    this.authService.logOut();
  }
  showPilotProfile() {
    this.pilotService.showPilotProfile();
  }
}
