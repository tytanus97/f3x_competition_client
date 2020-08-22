import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.css']
})
export class SearchEventComponent implements OnInit {

  public eventList: Array<Event>;

  constructor(private router: Router, private route: ActivatedRoute,
              private eventService: EventService, private location: Location) { }

  ngOnInit(): void {

    this.eventService.getAllEvents().subscribe(response => {
      this.eventList = response.body;
    },
    error => console.log(error));
  }

  navigateBack() {
    this.location.back();
  }

}
