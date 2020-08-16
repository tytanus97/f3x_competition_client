import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pilot-home',
  templateUrl: './pilot-home.component.html',
  styleUrls: ['./pilot-home.component.css']
})
export class PilotHomeComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  searchPilots() {
    this.router.navigate(['allPilots'],{relativeTo: this.route.parent});
  }

}
