import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/Location';
import * as L from 'leaflet';
import * as C from 'leaflet.markercluster'



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
    }, err => { console.log(err) },
      () => {
        this.initMap();
      })

  }


  showLocationDetails(locationId: number) {
    this.router.navigate(['locationDetails'], { queryParams: { locationId: `${locationId}` }, relativeTo: this.route.parent });
  }
  goToAddLocation() {
    this.router.navigate(['../locationForm'], { relativeTo: this.route });
  }

  initMap() {
    this.map = new L.map('map').setView([52.237, 21.017], 10);

    const iconSize = 40;

    const iconOptions = {
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize],
      iconUrl: "../assets/images/location.svg"
    }

    const icon = {
      draggable: false,
      icon: L.icon(iconOptions)
    }
     const title = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
    //const markers = new C.MarkerClusterGroup();

    this.locations.forEach(l => {
      const coords = this.transformCoords(l.latitude,l.longitude);
      const marker = new L.marker([coords.longitude,coords.latitude], icon);
      const popup = L.popup({offset:[0,-30]}).setContent(`${l.locationName}`);
      
      marker.on('mouseover', (event) => {
        event.target.openPopup();
      });
      marker.on('mouseout', (event) => {
        setTimeout(() => event.target.closePopup(),1000);
      })
      marker.bindPopup(popup);
      marker.addTo(this.map);
    });

    this.map.addLayer(title);
    
  }

  private transformCoords(lat: string, lon: string): { latitude:number,longitude: number} {
      return {
        latitude: (Math.round(Number(lat) * 1000)/1000),
        longitude: (Math.round(Number(lon) * 1000)/1000),
      }
  }
}
