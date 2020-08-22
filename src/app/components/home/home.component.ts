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
    this.router.navigate(['/events/searchEvent']);
  }
  searchPilots() {
    this.router.navigate(['/pilots/allPilots']);
  }
  searchLocations() {
    this.router.navigate(['/locations/home']);
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
