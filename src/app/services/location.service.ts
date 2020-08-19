import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Location } from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  private _url = 'http://localhost:8080/api/locations/'

  constructor(private http: HttpClient) { }

  addLocation(fd: FormData) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      options: {
        observe: 'response'
      }
    };
    return this.http.post(this._url, fd, httpOptions);
  }

  getById(locationId: number): any {
    return this.http.get<Location>(this._url + `${locationId}`);
  }


  findAllLocations() {
    return this.http.get<Array<Location>>(this._url);
  }
}
