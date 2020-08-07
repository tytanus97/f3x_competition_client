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


  navigate(target: string) {
      this.router.navigate([`${target}`]);
  }

  showPilotProfile() {
    if (localStorage.getItem('token') && localStorage.getItem('loggedPilotId')) {
      // tslint:disable-next-line: radix
      this.pilotService.changeCurrentPilot(parseInt(localStorage.getItem('loggedPilotId')));
      this.router.navigate(['/pilots/pilotDetails']);
    }

  }

}
