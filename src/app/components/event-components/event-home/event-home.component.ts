import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css']
})
export class EventHomeComponent implements OnInit {

  constructor(private eventService: EventService,private authService: AuthService,
              private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

  }

  searchEvent() {
    this.router.navigate(['searchEvent'],{relativeTo:this.route.parent});
  }

  navigateBack() {
    this.location.back();
  }

  addEvent() {
    this.router.navigate(['addEvent'],{relativeTo:this.route.parent});
  }

}
