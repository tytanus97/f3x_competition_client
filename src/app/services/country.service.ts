import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _url = 'http://localhost:8080/api/countries/';
  private countries: Array<Country>;

  constructor(private http: HttpClient) { }

  public getAllCountries(): Observable<Array<Country>> {
      return this.http.get<Array<Country>>(this._url);
  }
}
