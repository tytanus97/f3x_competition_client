import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  

  private _url = 'http://localhost:8080/api/locations/'

  constructor(private http: HttpClient) { }

  addLocation(location: Location) {
    
    return this.http.post(this._url,location);
  }

  getById(locationId: number): any {
    return this.http.get<Location>(this._url + `${locationId}`);
  }
  

  findAllLocations() {
    return this.http.get<Array<Location>>(this._url);
  }
}
