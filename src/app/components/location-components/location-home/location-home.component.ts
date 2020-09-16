import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/Location';
import { ThrowStmt } from '@angular/compiler';
 import * as L from 'leaflet'; 

@Component({
  selector: 'app-location-home',
  templateUrl: './location-home.component.html',
  styleUrls: ['./location-home.component.css']
})
export class LocationHomeComponent implements OnInit {

  public locations: Array<Location>;
  private map;

  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService) { }

  ngOnInit(): void {
      this.locationService.findAllLocations().subscribe(data => {
        console.log(data);
        this.locations = data;
      },err => {console.log(err)},
      () => {
        this.initMap();
      })
     
  }
  

  showLocationDetails(locationId: number) {
    this.router.navigate(['locationDetails'], {queryParams: {locationId: `${locationId}`}, relativeTo: this.route.parent});
  }
  goToAddLocation() {
    this.router.navigate(['../locationForm'], {relativeTo: this.route});
  }

  initMap() {
    this.map = L.map('map').setView([52.237,21.017], 10);
    const iconSize = 40;

    const iconOptions = {
      iconSize:[iconSize,iconSize],
      iconAnchor:[iconSize/2,iconSize],
      iconUrl:"../assets/images/location.svg"
    }

    const icon = {
      draggable:false,
      icon: L.icon(iconOptions)
    }

    this

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([52.237,21.017],icon).addTo(this.map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  }
}
