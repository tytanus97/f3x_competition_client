import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-home',
  templateUrl: './location-home.component.html',
  styleUrls: ['./location-home.component.css']
})
export class LocationHomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService) { }

  ngOnInit(): void {
  }


  goToAddLocation() {
    this.router.navigate(['../locationForm'], {relativeTo: this.route});
  }
}
