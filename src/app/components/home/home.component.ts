import { HttpParams } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PilotService } from 'src/app/services/pilot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private pilotService: PilotService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.authService.isLogged();
  }

  searchEvent() {
    this.router.navigate(['/events/searchEvents']);
  }
  searchPilots() {
    this.router.navigate(['/pilots/searchPilots']);
  }
  searchLocations() {
    this.router.navigate(['/locations/searchLocations']);
  }

  showPilotProfile() {
    this.pilotService.showPilotProfile();
  }

  logout() {
    this.authService.logOut();
  }

  register() {
    this.pilotService.showPilotRegister();
  }

  login() {
    this.pilotService.showPilotLogin();
  }

}
