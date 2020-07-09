import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {

    
  }

  ngOnInit(): void {
  }

}
