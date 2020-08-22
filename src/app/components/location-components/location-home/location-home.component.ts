import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/Location';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-location-home',
  templateUrl: './location-home.component.html',
  styleUrls: ['./location-home.component.css']
})
export class LocationHomeComponent implements OnInit {

  public locations: Array<Location>;

  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService) { }

  ngOnInit(): void {
      this.locationService.findAllLocations().subscribe(data => {
        console.log(data);
        this.locations = data;
      })
  }

  showLocationDetails(locationId: number) {
    this.router.navigate(['locationDetails'], {queryParams: {locationId: `${locationId}`}, relativeTo: this.route.parent});
  }
  goToAddLocation() {
    this.router.navigate(['../locationForm'], {relativeTo: this.route});
  }
}
