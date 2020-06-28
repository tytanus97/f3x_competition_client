import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../entities/Country';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Array<Country>> {
    return this.http.get<Country[]>(this.url + 'countries/');
  }

}
