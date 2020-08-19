import { Location as LocationRoute } from '@angular/common';
import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Location } from 'src/app/models/Location';
import { LocationService } from 'src/app/services/location.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {


  public currentLocation: Location;

  constructor(private locationService: LocationService, private router: Router, private route: ActivatedRoute,
              private location: LocationRoute) {
  }

  ngOnInit(): void {
    const locationId = this.route.snapshot.queryParamMap.get('locationId');
    console.log(locationId);
    try {
      if (Number(locationId)) {
        this.locationService.getById(Number(locationId)).subscribe(location => {
          this.currentLocation = location;
          console.log('lokacja');
          console.log(location);
        });
      } else {
        throw Error('Invalid locationId parameter');
      }
    } catch (err) {
      this.router.navigate(['home'], { relativeTo: this.route.parent });
    }
  }

  navigateBack() {
    this.location.back();
  }
}
