import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/Location';
import * as L from 'leaflet';
import * as C from 'leaflet.markercluster'
import { Country } from 'src/app/models/Country';
import { mergeMap, take } from 'rxjs/operators';
import { CountryService } from 'src/app/services/country.service';
import { iif } from 'rxjs';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-location-home',
  templateUrl: './location-home.component.html',
  styleUrls: ['./location-home.component.css']
})
export class LocationHomeComponent implements OnInit {

  public locations: Array<Location>;
  public countries: Array<Country>;

  private map;

  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService,private countryService: CountryService) { }

  ngOnInit(): void {
    this.locationService.findAllLocations().pipe(mergeMap(data => {
      this.locations = data;
      return this.countryService.getAllCountries();
    })).subscribe(data => {
      console.log(data);
     this.countries = data;
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
    this.map = new L.map('map').setView([52.237, 21.017], 5);

    const iconSize = 40;

    const iconOptions = {
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize],
      iconUrl: "../assets/images/location.svg",
      class:"marker"
    }

    const icon = {
      draggable: false,
      icon: L.icon(iconOptions)

    }
    const title = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.locations.forEach(l => {
      const coords = this.transformCoords(l.latitude, l.longitude);
      const marker = new L.marker([coords.longitude, coords.latitude], icon);

      let popupContent = `<center>${l.locationName}<br>Coords<br>Latitude: ${l.latitude}<br>Longitude: ${l.longitude}`
      popupContent += `<br><a href="/locations/locationDetails?locationId=${l.locationId}">Wiecej</a></center>`
      const popup = L.popup({ offset: [0, -30]}).setContent(popupContent);
      marker.bindPopup(popup);
      marker.addTo(this.map);
    });

    this.map.addLayer(title);
  }

  showOnMap(location: Location) {
    const coords = this.transformCoords(location.latitude,location.longitude);
    this.map.setView([coords.longitude, coords.latitude],14);
  }

  private transformCoords(lat: string, lon: string): { latitude: number, longitude: number } {
    return {
      latitude: (Math.round(Number(lat) * 1000) / 1000),
      longitude: (Math.round(Number(lon) * 1000) / 1000),
    }
  }

  onSelectCountryChange(countryName: string) {
    iif(()=> countryName !== 'all',this.locationService.findAllLocationsByCountryName(countryName),this.locationService.findAllLocations())
    .pipe(take(1)).subscribe((data) => {
        this.locations = data;
        this.map.off();
        this.map.remove();
        this.initMap();
      });
  }
}
