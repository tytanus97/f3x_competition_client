import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/Location';
import { LocationService } from 'src/app/services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, catchError, last } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { createInject } from '@angular/compiler/src/core';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {


  public currentLocation: Location;

  constructor(private locationService: LocationService,private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit(): void {

    let locationId = this.route.snapshot.queryParamMap.get('locationId');
    console.log(locationId);
    try{
    if(Number(locationId)) {
        this.locationService.getById(Number(locationId)).subscribe(location => this.currentLocation = location);
    } else throw Error('Invalid locationId parameter');
    } catch(err) {
      this.router.navigate(['home'],{relativeTo:this.route.parent});
    }
    


    /* 
    this.route.paramMap.pipe(last(),switchMap(params => {
      console.log(params.get('locationId'));
      if(params.get('locationId')) {
        return this.locationService.getById(Number(params.get('locationId')));
      } else {
        throw Error('Undefinded locationId parameter');
      }
    }),catchError((error) => { 
      console.log(error);
      return this.router.navigate(['home'],{relativeTo:this.route.parent});
    })).subscribe(location => this.currentLocation = location as Location);
   */}

}
