import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Country } from '../entities/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countries: Array<Country>;

  constructor(private httpService: HttpService) { }

  public getAllCountries(): void {
    this.httpService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }
}
